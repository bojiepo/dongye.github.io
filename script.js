// 获取页面元素
const form = document.querySelector("#gpt-form");
const input = document.querySelector("#input-text");
const output = document.querySelector("#output-text");
const errorMessage = document.querySelector("#error-message");

// GPT-3 API 认证信息
const apiKey = "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";
const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";

// 提交表单时触发
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // 获取输入文本
  const inputText = input.value.trim();

  // 如果输入文本为空，则显示错误信息
  if (inputText === "") {
    errorMessage.textContent = "请输入要生成的文本";
    return;
  }

  // 发送 API 请求
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: inputText,
      max_tokens: 1024,
      temperature: 0.5,
    }),
  });

  // 如果请求成功，则显示生成的文本
  if (response.ok) {
    const { choices } = await response.json();
    const generatedText = choices[0].text.trim();
    output.value = generatedText;
    errorMessage.textContent = "";
  } else {
    errorMessage.textContent = "生成失败，请稍后再试";
  }
});

// 清空按钮点击时触发
document.querySelector("#clear-btn").addEventListener("click", () => {
  input.value = "";
  output.value = "";
  errorMessage.textContent = "";
});
