import { GetDataError, InfoError, ServerError } from "@/constant/ERROR";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid, limit = "10" } = req.query;
  const nPid = parseInt(pid as string);
  const nLimit = parseInt(limit as string);

  if (isNaN(nLimit) || isNaN(nPid))
    return res.status(InfoError.status).json({ msg: InfoError.msg });

  try {
    const { data, error } = await supabase
      .from("tb_comment")
      .select("cid, uid, tb_user(nickname), content, createdAt")
      .eq("pid", pid)
      .limit(nLimit)
      .order("createdAt", { ascending: false });

    if (error)
      return res.status(GetDataError.status).json({ msg: GetDataError.msg });

    if (data?.length > 0) {
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
