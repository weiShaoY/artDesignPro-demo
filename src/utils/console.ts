// ANSI 转义码生成网站  https://patorjk.com/software/taag/#p=display&f=Big&t=ABB%0A

console.info(
  '%cNiceToMeetYou,我是weiShaoY',
  'color: orange; background: ivory; font-size: 26px; border: 2px solid black; padding: 10px; text-shadow: 1px 1px grey; border-radius: 11px;',
)
const asciiArt = `
\x1B[32m✨ 你好！我是weiShaoY！
\x1B[0m
\x1B[36m💡 欢迎您访问我的网站！
\x1B[0m
\x1B[33m🌟 GitHub: ${import.meta.env.VITE_GITHUB_URL}
`

console.log(asciiArt)
