<script>
// @ts-nocheck

  import { tagsData, formData, uid } from "../stores.js";
  import { doc, getFirestore } from "firebase/firestore";
  import { collection, getDocs, Timestamp } from "firebase/firestore";
  import { addDoc } from "firebase/firestore";
  import Form from "../components/Form.svelte";
  import Tags from "../components/Tags.svelte";
  import { onMount } from "svelte";

  const db = getFirestore();

  let testTags = [];

  (async () => {
    const querySnapshot = await getDocs(collection(db, "tags"));
    let res = [];
    querySnapshot.forEach(doc => {
      res.push(doc.data());
    })
    return Promise.resolve(res);
  })().then(t => {
    testTags = t.map(obj => {
      return obj.tag;
    })
  });

  const addData = async (tags, form) => {
    try {
      await addDoc(collection(db, `users/${user}/records`), {
        title : form[0],
        amount : Number(form[1]),
        tags : tags,
        dateCreated : Timestamp.now(),
      });

      console.log("Successfully pushed data.")
      return Promise.resolve(1);
    } catch (e) {
      console.log(e)
    }
  }

  let tags, form, user;
  let reset = false;

  tagsData.subscribe((t) => (tags = t));
  formData.subscribe((t) => (form = t));
  uid.subscribe(t => user = t)

  const handleSubmit = () => {
    if (!form[0] || !form[1] || tags.length === 0) {
      alert("Error uploading data. Please recheck format!");
      return;
    } else {
      addData(tags, form).then(() => reset = true);
    }
  };
</script>

<div class="wrapper">
    <main class="vcontainer">
        <Form on:message={() => (reset = false)} {reset} />
        <Tags reset={reset} testTags={testTags}/>
        <button on:click={handleSubmit} class="submit-cta">Submit</button>
    </main>
</div>

<style>
  .submit-cta {
    @apply px-3;
    @apply border-black;
    @apply border-2;
    @apply rounded-sm;
    @apply text-xl;
  }
</style>