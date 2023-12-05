


export function EmptyScreenBookmarks() {
  const TextDirection = process.env.TEXT_DIRECTION
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold" dir={TextDirection}>  
          {TextDirection == 'RTL' ? "هیچ نشانکی یافت نشد!" : "No bookmarks yet!"}
        </h1>
        <p className="leading-normal text-muted-foreground" dir={TextDirection}>
          {TextDirection == 'RTL' ? "برای شروع چند پرسش-پاسخ را نشانک‌گذاری کنید." : "You can start by bookmarking some question-answers."}
        </p>
      </div>
    </div>
  )
}
