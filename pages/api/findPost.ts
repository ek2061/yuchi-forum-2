import { GetDataError, InfoError, ServerError } from "@/constant/ERROR";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid } = req.query;
  const nPid = parseInt(pid as string);

  if (isNaN(nPid))
    return res.status(InfoError.status).json({ msg: InfoError.msg });

  try {
    const { data, error } = await supabase
      .from("tb_post")
      .select(
        "pid, uid, title, content, createdAt, like, dislike, tb_user(nickname)"
      )
      .eq("pid", nPid)
      .order("createdAt", { ascending: false });

    if (error)
      return res.status(GetDataError.status).json({ msg: GetDataError.msg });

    if (data?.[0]) {
      const {
        // @ts-ignore
        tb_user: { nickname },
        ...rest
      } = data[0];
      const new_data = { ...rest, nickname };

      return res.status(200).json(new_data);
    }

    return res.status(200).json(null);
  } catch (err) {
    console.log(err);
    return res.status(ServerError.status).json({ msg: ServerError.msg });
  }
}
