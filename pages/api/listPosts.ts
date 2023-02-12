import { GetDataError, InfoError, ServerError } from "@/constant/ERROR";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { limit = "10" } = req.query;
  const nLimit = parseInt(limit as string);

  if (isNaN(nLimit))
    return res.status(InfoError.status).json({ msg: InfoError.msg });

  try {
    const { data, error } = await supabase
      .from("tb_post")
      .select(
        "pid, uid, title, excerpt, createdAt, like, dislike, tb_user(nickname)"
      )
      .limit(nLimit)
      .order("createdAt", { ascending: false });

    if (error)
      return res.status(GetDataError.status).json({ msg: GetDataError.msg });

    const new_data = data?.map((d) => {
      const {
        // @ts-ignore
        tb_user: { nickname },
        ...rest
      } = d;
      return { ...rest, nickname };
    });

    return res.status(200).json(new_data);
  } catch (err) {
    return res.status(ServerError.status).json({ msg: ServerError.msg });
  }
}
