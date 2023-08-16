export type WorkingHour = {
  open: string;
  close: string;
};

export type WorkingHours = {
  [day in
    | "poniedziałek"
    | "wtorek"
    | "środa"
    | "czwartek"
    | "piątek"
    | "sobota"
    | "niedziela"]: WorkingHour;
};
