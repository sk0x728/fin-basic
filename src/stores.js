import { writable } from "svelte/store";

export let tagsData = writable([]);
export let formData = writable(new Array(2))