'use strict';

{
  const question = document.getElementById('question');
  const choice = document.getElementById('choice');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel =document.querySelector('#result > p'); //スコア表示用

  const quizSet = [ //クイズのデータ
    {q: '2014年のパリーグ首位打者はだれ?', c: ['糸井嘉男　選手', '長谷川勇也　選手', '秋山翔吾　選手', '柳田悠岐　選手']},
    {q: '2012年の聖澤諒　選手の盗塁数は?', c: ['54', '62', '48', '43']},
    {q: '2016年の中島卓也　選手の犠打数は?', c: ['62', '72', '52', '38']},
    {q: '2018年のパリーグ打点王はだれ?', c: ['浅村栄斗　選手', '山川穂高　選手', '中田翔　選手', '吉田正尚　選手']},
    {q: '2014年のパリーグ優勝チームは?', c: ['ソフトバンク', '西武', '楽天', '日本ハム']},
    {q: '2021年のロッテの背番号8はだれ?', c: ['中村奨吾　選手', '今江敏晃　選手', '角中勝也　選手', '安田尚憲　選手']},
    {q: '平井克典　選手の得意球は?', c: ['スライダー', 'シンカー', 'フォーク', 'カットボール']},
    {q: '金子侑司　選手の入団時の背番号は?', c: ['2', '7', '8', '6']},
    {q: '岩瀬仁紀　選手の通算登板数は?', c: ['1002', '1001', '1000', '1010']},
    {q: '山田哲人　選手の2015年のホームラン数は?', c: ['38', '36', '42', '34']},
  ];
  let currentNum = 0; //何問目を解いているか
  let isAnswered; //回答したかどうかを管理
  let score = 0; //正答数を管理

  
  //選択肢の順番をシャッフルする関数
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function checkAnswer(li) { //正誤判定の関数
    if (isAnswered) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }
    btn.classList.remove('disabled');
  }

  function setQuiz() { //画面描画の関数
    isAnswered = false;
    question.textContent = quizSet[currentNum].q; //問題文表示

    while(choices.firstChild) { //前の問題を表示しないようにする
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => { //選択肢の表示
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = '結果参照';
    };
  }
  
  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      result.classList.remove('hidden');
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
    } else {
      currentNum++;
      setQuiz();
    }
  });
}