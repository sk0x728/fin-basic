<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();

    const monthKeys = ['JAN', 'FEB', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];

    export let timestamps;
    let activeElement;

    const handleMonthSelection = (m, y) => {
        if (activeElement != undefined) {
            activeElement.style.color = "black";
        }

        if (m === -1) {
            activeElement = document.getElementById(y.toString());
            activeElement.style.color = "green";
        } else {
            activeElement = document.getElementById(m.toString() + y.toString());
            activeElement.style.color = "green"
        }
        try {
            dispatch("message", {
                month: m,
                year: y
            })
        } catch (err) {
            console.log(`Internal error : ${err}`)
        }
    }

    onMount(() => {
        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth();
        handleMonthSelection(thisMonth, thisYear.toString());
    })

</script>

<!-- <main> -->
    <div class="vcontainer">
        {#each Object.entries(timestamps) as [year, months]}
            <button on:click={() => handleMonthSelection(-1, year)} class="year-cta" id={year}>{year}</button>
            <div class="months-container">
                {#each months as month}
                    <button id ={month.toString() + year.toString()} class="month-cta" on:click={() => handleMonthSelection(month, year)}>{monthKeys[month]}</button>
                {/each}
            </div>
            {/each}
    </div>
<!-- </main> -->

<style>
    .year-cta {
        @apply text-2xl;
        @apply cursor-pointer;
    }

    .month-cta {
        @apply text-lg;
        @apply cursor-pointer;
    }
    .months-container {
        @apply flex;
        @apply flex-col;
        @apply gap-0;
    }

    .active {
        @apply text-green-600;
    }
</style>