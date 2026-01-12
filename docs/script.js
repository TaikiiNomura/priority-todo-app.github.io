/**
 * 入力：json
 * 出力：javascriptの配列
 */

// localStorage.getItem("todos")
// -> ブラウザの保存領域 locaalStorage から "todos" という名前のデータを取り出す
// todosの中身例： "[{"text":"Buy milk","priority":"high","done":false}]" または null
// 
// JSON.parse(...)
// -> json 形式から [{text, priority, done}] の配列に変換　なければ空配列[]に変換
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos()
{
  /**
   * json に変換した todos を localStorage に戻す
   * 呼び出し：addTodos(), toggleDone(), deleteTodos()
   */

  // JSON.stringify(todos)
  // -> todos を一行の文字列に変換
  // 
  // localStorage.setItem("key", str)
  // -> strをKeyという名前でlocalStorageに保存する
  localStorage.setItem("todos", JSON.stringify(todos));
}

// // --- sort ---
// function myPriorityValue(p)
// {
//   if(p === "high") return 1
//   else if(p === "medium") return 2;
//   return 3; // low
// }

// function mySwapTodos(i, j)
// {
//   const tmp = todos[i];
//   todos[i] = todos[j];
//   todos[j] = tmp;
// }

// function sortTodos()
// {
//   /**
//    * priority を基準にソート
//    * @complexity O(n*n)
//    */

//   const n = todos.length;
//   for(let i=0; i<n-1; i++)
//   {
//     for(let j=0; j<n-1-i; j++)
//     {
//       const a = myPriorityValue(todos[j].priority);
//       const b = myPriorityValue(todos[j+1].priority);
//       if(a > b)mySwapTodos(j, j+1);
//     }
//   }
// }
// // --- end sort ---

// --- priority sort ---
function sortTodos()
{
  const high = [];
  const medium = [];
  const low = [];

  for(let i=0; i<todos.length; i++)
  {// todos を優先度ごとの配列に分ける
    const todo = todos[i];

    if(todo.priority === "high")high.push(todo);
    else if(todo.priority === "medium")medium.push(todo);
    else low.push(todo);
  }

  // concat: 複数のarrayを結合。新しい配列として返す
  todos = high.concat(medium, low);
}
// --- end priority sort ---

function addTodo() 
{
  /**
   * HTML の入力（text, priority）を受け取る
   * Todoレコードを配列に追加
   */

  // document: HTMLの入力
  // getElementById: HTMLのidを指定して要素を取得する
  const text = document.getElementById("taskInput").value;
  const priority = document.getElementById("priorityInput").value;

  // 何も入力しなかった場合
  if (text === "") return; 

  // push: 配列に追加
  
  todos.push(
    // レコード形式で追加する
    {
      text: text,
      priority: priority,
      done: false
    }
  );

  sortTodos();
  saveTodos();
  renderTodos();
}

function toggleDone(index) 
{
  /**
   * 配列のindex番目にアクセス
   * doneの true/false を反転
   */
  todos[index].done = !todos[index].done;
  sortTodos();
  saveTodos();
  renderTodos();
}

function renderTodos() 
{
  /**
   * todos を先頭から走査
   * 各todoをDOM（li要素）に変換
   * 画面に表示
   */

  // 現在の描画をすべて消す
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  // 配列を先頭から走査
  todos.forEach((todo, index) => {

    // todoをHTML用の要素に変換
    const li = document.createElement("li");
    li.className = todo.priority;

    // 配列のindexと画面上のボタンをむずびつける
    // onclick="toggleDone(${index})"
    // onclick="deleteTodo(${index})"
    li.innerHTML = `
      <input type="checkbox" ${todo.done ? "checked" : ""} onclick="toggleDone(${index})">
      ${todo.text} (${todo.priority})
      <button onclick="deleteTodo(${index})">削除</button>
    `;

    // 1件分のTodoを表示
    list.appendChild(li);
  });
}

function deleteTodo(index)
{
  /**
   * index で指定された Todo を配列から削除
   * splice により配列を詰めなおし
   */

  // index番目を削除　O(n)
  todos.splice(index, 1);

  saveTodos();
  renderTodos();
}

renderTodos();
