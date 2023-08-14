import type { Appointment } from "$lib/types/Appointment";
import { writable } from "svelte/store";

export let appointments = writable<Appointment[]>([]);
