// Fro asyns Fucation 
// ese aap ek two asyn funcation ek asycn funcation suppose 3s time lag raha hae but dusra ek asycs funation ko 4s lag rahe hae to total time 7s hoga 
// const []= await Promise.all([]) // But in case ek uppar wali sirf jis ek asyn funcation jadya time lage sirf use utna total time lagefa matlab total time 4s hoga  
// promise.all([]) ese ek yaad dyan har to asyns funcation ek durse par depende nahi karna chaiye   kya hae sahi hae 

## 🔹 **Theory: What is `Promise.all`?**

* `Promise.all()` ek **method** hai jo ek array (ya iterable) of promises leta hai.
* Ye ek **single promise** return karta hai jo **tabhi resolve hota hai jab saare promises resolve ho jaate hain**.
* Agar ek bhi promise **reject** ho jaaye, to pura `Promise.all()` reject ho jaata hai (fail-fast behavior).

---

## 🔹 **Key Points**

1. **Parallel Execution**
   Sab promises ek saath run hote hain (parallel).

2. **Result Order**
   Jo array tumne diya hai usi order mein results return hote hain, **execution order se farak nahi padta**.

3. **Time Taken**
   Total time = **sabse zyada time lagne wale promise ka time** (max time).

---

## 🔹 **Simple Example**

```js
function task(name, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${name} completed in ${time / 1000}s`);
    }, time);
  });
}

async function runTasks() {
  console.time("Total Time");

  const results = await Promise.all([
    task("Task 1", 3000), // 3s
    task("Task 2", 4000), // 4s
    task("Task 3", 2000), // 2s
  ]);

  console.timeEnd("Total Time");
  console.log(results);
}

runTasks();
```

---

## 🔹 **Expected Output**

```
Total Time: ~4000ms
[
  'Task 1 completed in 3s',
  'Task 2 completed in 4s',
  'Task 3 completed in 2s'
]
```

👉 Yaha pe:

* Total time sirf **4s** (sabse lamba wala task).
* Output array ka order wahi hai jo tumne diya (`Task 1`, `Task 2`, `Task 3`), chahe execution order alag ho.

---

## 🔹 **Real-Life Example**

👉 Maan lo tumhe ek page render karna hai jisme 3 API calls lagte hain:

* **User Data** (2s)
* **Posts** (3s)
* **Comments** (4s)

Tum `Promise.all` use karke teeno API parallel call karoge:

```js
async function fetchPageData() {
  console.time("Page Load");

  const [user, posts, comments] = await Promise.all([
    fetch("/api/user").then(res => res.json()),
    fetch("/api/posts").then(res => res.json()),
    fetch("/api/comments").then(res => res.json()),
  ]);

  console.timeEnd("Page Load");
  console.log({ user, posts, comments });
}

fetchPageData();
```

### Advantage:

* Total time = **4s** (sabse bada API call).
* Agar sequential karte to total time = 2s + 3s + 4s = **9s** 🚫

---

## 🎯 **Summary**

* `Promise.all` = sabko **parallel** run karo → result fastest time mein mil jaata hai.
* Sirf use karo jab sab results ek saath chahiye aur wo ek dusre pe depend **nahi** karte.
* Agar ek bhi fail ho jaaye → pura `Promise.all` fail ho jaata hai.

---

👉 Ab batao Cyber, kya tum chahte ho main iska **visual timeline diagram** bana kar samjhaun (jaise ek chart: Task1, Task2, Task3 run ho rahe hain aur Promise.all ka total time dikh raha ho)?
