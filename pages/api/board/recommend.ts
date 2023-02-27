import { GetDataError, ServerError } from "@/constant/ERROR";
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data, error } = await supabase
      .from("tb_board")
      .select("bid, name, volume")
      .order("volume", { ascending: false })
      .limit(3);

    if (error)
      return res.status(GetDataError.status).json({ msg: GetDataError.msg });

    if (data?.length > 0) {
      return res.status(200).json(data);
    }

    return res.status(200).json([]);
  } catch (err) {
    return res.status(ServerError.status).json({ msg: ServerError.msg });
  }
}
