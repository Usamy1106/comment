// 用意されたテキスト配列
const predefinedWishes = [
    "今年こそダイエットを成功させる",
    "毎日30分読書する習慣をつける",
    "TOEICで800点以上取る",
    "朝5時に起きる生活を始める",
    "週3回ジムに通う",
    "プログラミングを習得する",
    "副業で月5万円稼ぐ",
    "禁煙を絶対に成功させる",
    "毎日1万歩歩く",
    "資格試験に合格する",
    "貯金100万円達成する",
    "料理のレパートリーを増やす",
    "英語で日常会話ができるようになる",
    "早寝早起きを習慣化する",
    "毎日瞑想の時間を作る",
    "ストレスフリーな生活を送る",
    "新しい趣味を見つける",
    "月に1冊本を書く",
    "健康診断の数値を改善する",
    "家族との時間を大切にする",
    "友達を10人増やす",
    "感謝の気持ちを忘れない",
    "ポジティブ思考を身につける",
    "整理整頓を徹底する",
    "無駄遣いをやめる",
    "毎週末に新しい場所へ行く",
    "日記を毎日書く",
    "お酒を週2回までにする",
    "スマホ時間を減らす",
    "自炊を週5日する",
    "夢に向かって一歩踏み出す",
    "ネガティブな言葉を使わない",
    "笑顔を絶やさない",
    "誰かの役に立つ",
    "親孝行をもっとする",
    "ペットを飼う",
    "資格を取る",
    "マラソン大会に出場する",
    "ヨガを始める",
    "断捨離を完了させる",
    "投資の勉強を始める",
    "ブログを開設する",
    "YouTubeチャンネルを作る",
    "イラストが上手くなる",
    "楽器を演奏できるようになる",
    "旅行で海外に行く",
    "温泉巡りをする",
    "キャンプに挑戦する",
    "登山を始める",
    "自転車で遠出する",
    "写真の腕を上げる",
    "SNSでフォロワー1000人",
    "人前で堂々と話せるようになる",
    "時間管理が上手になる",
    "計画的に行動する",
    "完璧主義をやめる",
    "失敗を恐れない",
    "新しいことにチャレンジする",
    "自分に自信を持つ",
    "周りに流されない",
    "本当にやりたいことを見つける",
    "転職を成功させる",
    "起業する！！",
    "フリーランスになる",
    "受験合格する！！",
    "年収を100万円上げる",
    "昇進する",
    "プレゼン力を磨く",
    "リーダーシップを発揮する",
    "部下から信頼される",
    "仕事とプライベートを両立する",
    "残業をゼロにする",
    "有給休暇を全部使う",
    "ワークライフバランスを整える",
    "ストレス耐性を高める",
    "コミュ力を上げる",
    "聞き上手になる",
    "気配り上手になる",
    "約束を必ず守る",
    "時間に遅れない",
    "メールの返信を早くする",
    "デスクを常に綺麗にする",
    "姿勢を良くする",
    "視力を回復させる",
    "肌を綺麗にする",
    "髪を伸ばす",
    "オシャレになる",
    "体重を5キロ減らす",
    "筋肉をつける",
    "体脂肪率を減らす",
    "柔軟性を高める",
    "持久力をつける",
    "健康的な食生活を送る",
    "野菜を毎日食べる",
    "水を2リットル飲む",
    "間食をやめる",
    "夜食をやめる",
    "食事の時間を規則正しくする"
];



// データ管理
let wishes = {
    others: [],
    mine: []
};

// スタンプを押した願いのIDを記録
let stampedWishes = new Set();

// 初期化
function init() {
    // ランダムに6個の願いを選択
    const shuffled = [...predefinedWishes].sort(() => Math.random() - 0.5);
    wishes.others = shuffled.slice(0, 8).map((text, index) => ({
        id: 'other-' + index,
        text: text,
        fires: Math.floor(Math.random() * 20)
    }));

    render();
}

// モーダル開閉
function openModal() {
    document.getElementById('inputModal').classList.add('active');
    document.getElementById('wishInput').value = '';
    document.getElementById('charCount').textContent = '0';
}

function closeModal() {
    document.getElementById('inputModal').classList.remove('active');
}

// 文字数カウント
document.getElementById('wishInput').addEventListener('input', function (e) {
    document.getElementById('charCount').textContent = e.target.value.length;
});

// 願いを保存
function saveWish() {
    const text = document.getElementById('wishInput').value.trim();
    if (text === '') {
        alert('願いを入力してください');
        return;
    }

    const newWish = {
        id: 'mine-' + Date.now(),
        text: text,
        fires: 0
    };

    wishes.mine.push(newWish);
    closeModal();
    render();
}

// スタンプを追加
function addFire(id, isMine) {
    // 既にスタンプ済みの場合は何もしない
    if (stampedWishes.has(id)) {
        return;
    }

    const list = isMine ? wishes.mine : wishes.others;
    const wish = list.find(w => w.id === id);
    if (wish) {
        wish.fires++;
        stampedWishes.add(id);

        // 全てにスタンプを押したかチェック
        if (stampedWishes.size === wishes.others.length) {
            // リセット：新しい願いをランダムに選択
            stampedWishes.clear();
            const shuffled = [...predefinedWishes].sort(() => Math.random() - 0.5);
            wishes.others = shuffled.slice(0, 8).map((text, index) => ({
                id: 'other-' + Date.now() + '-' + index,
                text: text,
                fires: Math.floor(Math.random() * 20)
            }));
        }

        render();
    }
}

// 描画
function render() {
    // みんなの宣言
    const othersContainer = document.getElementById('othersWishes');
    othersContainer.innerHTML = wishes.others.map(wish => `
                <div class="wish-card">
                    <div class="wish-text">${wish.text}</div>
                    <div class="wish-footer">
                        <button class="fire-btn ${stampedWishes.has(wish.id) ? 'stamped' : ''}" onclick="addFire('${wish.id}', false)">
                            <i class="fire-icon">🔥</i>
                            <div class="fire-count">${wish.fires}</div>
                        </button>
                    </div>
                </div>
            `).join('');

    // 自分の宣言
    const myContainer = document.getElementById('myWishes');
    if (wishes.mine.length === 0) {
        myContainer.innerHTML = '<p class="yet-text">まだ宣言がありません</p>';
    } else {
        myContainer.innerHTML = wishes.mine.map(wish => `
                    <div class="wish-card my-wish-card">
                        <div class="wish-text">${wish.text}</div>
                        <div class="wish-footer">
                            <span style="color: #ffd93d; font-weight: bold;">あなたの宣言</span>
                            <div class="fire-count">🔥 ${wish.fires}</div>
                        </div>
                    </div>
                `).join('');
    }
}

// モーダル外クリックで閉じる
document.getElementById('inputModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// 初期化実行
init();