import { appointments } from "$lib/store/store";
import { supabase } from "$lib/supabaseClient";
import type { Appointment } from "$lib/types/Appointment";

export const load = async ({ params, url, depends }) => {
  const start = url.searchParams.get("start") ?? 0;
  const end = url.searchParams.get("end") ?? 10;
  const { type, id } = params;
  const date = new Date();
  const currentDate = date.toJSON().slice(0, 10);
  const currentHour = date.getHours();
  const currentMinutes = date.getMinutes();
  const currentTime = `${currentHour}:${currentMinutes}:00`;

  let query = supabase
    .from("appointments")
    .select("*", { count: "exact" })
    .eq("user_id", id)
    .range(start, end)
    .order("date", { ascending: true })
    .order("hour", { ascending: true });

  if (type === "history") {
    query = query.or(
      `date.lt.${currentDate},and(date.eq.${currentDate},hour.lt.${currentTime})`
    );
  }
  if (type === "scheduled") {
    query = query.or(
      `date.gt.${currentDate},and(date.eq.${currentDate},hour.gte.${currentTime})`
    );
  }
  const { data, count } = await query;

  const appointmentsCount = Array.from(
    { length: Math.floor((count ?? 0 - 10) / 10) },
    (_, i) => i + 1
  );
  appointments.set(data ?? []);
  depends("app:appointments");
  return {
    type,
    appointmentsCount,
  };
};
