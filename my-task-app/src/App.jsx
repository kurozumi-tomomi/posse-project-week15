import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const completedCount = tasks.filter((task) => task.done).length;
  const remainingCount = tasks.length - completedCount;
  const progress = tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (event) => {
    event.preventDefault();
    const text = input.trim();
    if (text === "") return;
    setTasks((currentTasks) => [...currentTasks, { id: Date.now(), text, done: false }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#fff9ed] bg-[radial-gradient(#ead7bd_1px,transparent_1px)] bg-[size:19px_19px] px-5 pb-6 text-left text-[#252b35] sm:px-7">
      <header className="mx-auto flex h-16 w-full max-w-[1060px] items-center justify-between border-b border-[#252b35]/15 sm:h-[76px]">
        <a className="inline-flex items-center gap-2.5 text-lg font-black text-[#252b35] no-underline" href="#top" aria-label="PON! ホーム">
          <span className="grid size-[34px] rotate-[-5deg] place-items-center rounded-[11px_11px_11px_4px] border-2 border-[#252b35] bg-[#ffe07b] text-[13px] shadow-[2px_2px_0_#252b35]" aria-hidden="true">P!</span>
          <span>PON!</span>
        </a>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#686d74] sm:gap-2 sm:text-[13px]"><span className="text-lg text-[#ff715b]" aria-hidden="true">✳</span> 今日も、ひとつずつ。</span>
      </header>

      <section className="mx-auto w-full max-w-[720px] py-11 sm:py-[58px]" id="top" aria-labelledby="page-title">
        <div className="mb-6 sm:mb-[30px]">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-black tracking-[1.6px] text-[#818087]"><span className="size-2 rounded-full bg-[#ff715b] shadow-[0_0_0_4px_rgba(255,113,91,0.14)]" /> MY LITTLE TASK LIST</div>
          <h1 id="page-title" className="m-0 text-[clamp(34px,7vw,54px)] font-black leading-[1.16] tracking-normal text-[#252b35]">やること、<span className="text-[#e95743] underline decoration-[8px] decoration-[#ffe07b] underline-offset-[-4px]">ポン！</span></h1>
          <p className="mt-3 text-sm text-[#777b83]">思いついたことを並べて、できたらチェック。</p>
        </div>

        <section className="mb-9 -rotate-[0.35deg] rounded-lg border-2 border-[#252b35] bg-[#bcebd8] px-[17px] py-[18px] shadow-[5px_5px_0_#252b35] sm:mb-10 sm:px-6 sm:py-[22px]" aria-label="タスクの進捗">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="mb-0.5 text-xs font-extrabold text-[#416d5d]">今日の進みぐあい</p>
              <p className="flex items-baseline gap-1"><strong className="text-[30px] font-black leading-none">{completedCount}</strong><span className="text-[13px] font-bold text-[#416d5d]"> / {tasks.length} 完了</span></p>
            </div>
            <span className="whitespace-nowrap rounded-full border-[1.5px] border-[#252b35] bg-[#fffdf6] px-3 py-1.5 text-xs font-extrabold">あと {remainingCount} つ</span>
          </div>
          <div
            className="mt-4 h-3 overflow-hidden rounded-full border-[1.5px] border-[#252b35] bg-white/70"
            role="progressbar"
            aria-label="完了したタスクの割合"
            aria-valuenow={completedCount}
            aria-valuemin={0}
            aria-valuemax={tasks.length || 1}
          >
            <span className="block h-full rounded-full border-r-[1.5px] border-[#252b35] bg-[#ff715b] transition-[width] duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-right text-[11px] font-bold text-[#416d5d]">
            {tasks.length > 0 && completedCount === tasks.length
              ? "やったね！全部おわり！ ✨"
              : "自分のペースでいこう"}
          </p>
        </section>

        <section aria-labelledby="list-title">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 id="list-title" className="m-0 text-[19px] font-black text-[#252b35]">タスクリスト</h2>
            <span className="text-[10px] font-black tracking-[1.2px] text-[#929198]">{tasks.length} ITEMS</span>
          </div>

          <form onSubmit={addTask} className="mb-[17px] flex gap-2">
            <label className="absolute size-px overflow-hidden [clip-path:inset(50%)]" htmlFor="new-task">新しいタスク</label>
            <input
              id="new-task"
              className="h-[52px] min-w-0 flex-1 rounded-md border-[1.5px] border-[#ded7ca] bg-[#fffefa] px-3 text-[13px] text-[#252b35] outline-none transition focus:border-[#ff715b] focus:ring-[3px] focus:ring-[#ff715b]/15 sm:px-4 sm:text-sm"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="新しいタスクを入力..."
            />
            <button type="submit" className="inline-flex min-w-[91px] items-center justify-center gap-1 rounded-md border-2 border-[#252b35] bg-[#ff715b] text-xs font-black text-[#fffdf8] shadow-[3px_3px_0_#252b35] transition hover:-translate-x-px hover:-translate-y-px hover:bg-[#e95743] hover:shadow-[4px_4px_0_#252b35] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#252b35] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#efb930] sm:min-w-[126px] sm:gap-2 sm:text-[13px]" aria-label="タスクを追加">
              <span className="text-xl font-normal" aria-hidden="true">+</span><span>追加する</span>
            </button>
          </form>

          {tasks.length > 0 ? (
            <ul className="m-0 grid list-none gap-[9px] p-0">
              {tasks.map((task, index) => (
                <li key={task.id} className={`flex min-h-[62px] items-center gap-2.5 rounded-md border-[1.5px] px-2.5 py-2.5 shadow-[0_2px_0_rgba(37,43,53,0.04)] transition hover:translate-x-0.5 sm:gap-[13px] sm:px-[13px] ${task.done ? "border-[#c8e4d8] bg-[#f0faf4]" : "border-[#e9e1d5] bg-[#fffefa] hover:border-[#f4a092]"}`}>
                  <label className="relative grid size-6 flex-none cursor-pointer place-items-center">
                    <input
                      className="peer absolute size-6 cursor-pointer opacity-0 focus-visible:outline-none"
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                      aria-label={`${task.text}を${task.done ? "未完了" : "完了"}にする`}
                    />
                    <span className="grid size-[22px] place-items-center rounded-md border-[1.5px] border-[#c9c2b6] bg-white text-sm font-black text-transparent transition peer-checked:rotate-[-5deg] peer-checked:border-[#39856d] peer-checked:bg-[#bcebd8] peer-checked:text-[#24614e] peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#efb930]" aria-hidden="true">✓</span>
                  </label>
                  <span className="hidden text-[10px] font-black tracking-wide text-[#b5ada1] sm:inline">{String(index + 1).padStart(2, "0")}</span>
                  <span className={`min-w-0 flex-1 [overflow-wrap:anywhere] text-sm font-bold leading-[1.45] ${task.done ? "text-[#82968e] line-through decoration-[#83bba4] decoration-2" : "text-[#252b35]"}`}>{task.text}</span>
                  <button
                    type="button"
                    className="grid size-8 flex-none place-items-center rounded-md bg-transparent text-[#aaa39a] transition hover:bg-[#fff0ec] hover:text-[#e95743] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#efb930]"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`${task.text}を削除`}
                    title="削除"
                  >
                    <span className="text-[23px] font-normal leading-none" aria-hidden="true">×</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex min-h-[190px] flex-col items-center justify-center rounded-md border-[1.5px] border-dashed border-[#dacdbc] bg-[#fffefa]/70 text-center">
              <span className="relative mb-3 grid size-[58px] rotate-[-5deg] place-items-center rounded-[18px_18px_18px_5px] border-[1.5px] border-[#252b35] bg-[#ffe07b] text-[25px] text-[#e95743] shadow-[3px_3px_0_#252b35]" aria-hidden="true"><span className="absolute right-1 top-1 text-[13px]">✦</span><span>☀</span></span>
              <p className="font-black">リストはまだまっさら！</p>
              <p className="mt-1 text-xs text-[#777b83]">最初のタスクを追加してみよう。</p>
            </div>
          )}
        </section>
      </section>

      <footer className="flex items-center justify-center gap-2 text-[11px] font-bold text-[#99928a]"><span className="text-[15px] text-[#ff715b]" aria-hidden="true">✳</span> 小さな一歩も、ちゃんと前進。</footer>
    </main>
  );
}

export default App;



