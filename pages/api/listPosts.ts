import { GetDataError, InfoError, ServerError } from "@/constant/ERROR";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page = "1", bid } = req.query;
  const nPage = parseInt(page as string);

  if (isNaN(nPage) || nPage <= 0)
    return res.status(InfoError.status).json({ msg: InfoError.msg });
  const per = 7;
  const startIndex = (nPage - 1) * per;
  const endIndex = nPage * per - 1;

  try {
    let query = supabase
      .from("tb_post")
      .select(
        "pid, uid, title, excerpt, createdAt, like, dislike, tb_user(nickname), bid"
      )
      .range(startIndex, endIndex)
      .order("createdAt", { ascending: false });

    let { data, error } = await query;

    if (bid) {
      let { data: d, error: e } = await query.eq("bid", bid);
      data = d;
      error = e;
    }

    if (error)
      return res.status(GetDataError.status).json({ msg: GetDataError.msg });

    if (data && data?.length > 0) {
      const new_data = data?.map((d) => {
        const {
          // @ts-ignore
          tb_user: { nickname },
          ...rest
        } = d;
        return { ...rest, nickname };
      });

      return res.status(200).json(new_data);
    }

    return res.status(200).json([]);
  } catch (err) {
    return res.status(ServerError.status).json({ msg: ServerError.msg });
  }
}
