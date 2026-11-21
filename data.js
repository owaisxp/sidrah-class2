/* Sidrah Academy Class 2 - curriculum and question bank.
   Curriculum is data: subjects -> chapters -> fact sets or generators.
   Questions are built at start-up from a fixed seed, so every device gets the same bank. */
var SA = (function () {
  function rng(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  var R = rng(20261121);
  function ri(r, a, b) { return a + Math.floor(r() * (b - a + 1)); }
  function shuffle(arr, r) { r = r || Math.random; var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function fill(t, x, y) { return t.split('{x}').join(x).split('{y}').join(y); }
  function cap(t) { return t && /[a-z]/.test(t[0]) ? t[0].toUpperCase() + t.slice(1) : t; }
  var ONES = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  var TENS = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  function words(n) { if (n < 20) return ONES[n]; if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : ''); return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + words(n % 100) : ''); }
  var URD = '۰۱۲۳۴۵۶۷۸۹';
  function urNum(n) { return String(n).split('').map(function (d) { return URD[+d]; }).join(''); }
  function numOpts(ans, r, c) {
    var s = []; shuffle(c || [], r).forEach(function (x) { if (x !== ans && x >= 0 && s.indexOf(x) < 0) s.push(x); });
    var deltas = shuffle([1, -1, 2, -2, 10, -10, 5, -5, 3, -3, 20, -20], r);
    for (var i = 0; i < deltas.length && s.length < 3; i++) { var x = ans + deltas[i]; if (x >= 0 && x !== ans && s.indexOf(x) < 0) s.push(x); }
    return shuffle([ans].concat(s.slice(0, 3)), r);
  }
  var NAMES = ['Ali', 'Sara', 'Hamza', 'Ayesha', 'Zain', 'Fatima', 'Umair', 'Maryam', 'Bilal', 'Hira'];

  var SUBJ = [
  { id: 'eng', name: 'English', glyph: 'Aa', color: '#3B6FB6', chapters: [
    { id: 'eng-1', t: 'Naming words (nouns)', intro: 'A noun is the name of a person, place, animal or thing.', sets: [
      { pairs: [['teacher','person'],['doctor','person'],['mother','person'],['farmer','person'],['Jhelum','place'],['Lahore','place'],['school','place'],['park','place'],['market','place'],['cat','animal'],['horse','animal'],['parrot','animal'],['camel','animal'],['pencil','thing'],['chair','thing'],['bottle','thing'],['kite','thing'],['clock','thing']], q: '"{x}" is the name of a…', tf: '"{x}" is the name of a {y}.' }] },
    { id: 'eng-2', t: 'Opposites', intro: 'Opposites are words that mean the reverse of each other, like hot and cold.', sets: [
      { pairs: [['hot','cold'],['big','small'],['day','night'],['up','down'],['happy','sad'],['fast','slow'],['tall','short'],['open','close'],['wet','dry'],['light','dark'],['old','new'],['full','empty'],['early','late'],['in','out'],['rich','poor'],['clean','dirty'],['hard','soft'],['push','pull'],['come','go'],['strong','weak']], q: 'What is the opposite of "{x}"?', tf: 'The opposite of "{x}" is "{y}".', rev: 'What is the opposite of "{x}"?' }] },
    { id: 'eng-3', t: 'Singular and plural', intro: 'Singular means one. Plural means more than one. Most words add -s, some add -es, and some change completely.', sets: [
      { pairs: [['cat','cats'],['box','boxes'],['baby','babies'],['man','men'],['child','children'],['mouse','mice'],['tooth','teeth'],['foot','feet'],['leaf','leaves'],['bus','buses'],['toy','toys'],['knife','knives'],['woman','women'],['dish','dishes'],['lady','ladies'],['glass','glasses']], q: 'What is the plural of "{x}"?', tf: 'The plural of "{x}" is "{y}".', rev: 'What is the singular of "{x}"?' }] },
    { id: 'eng-4', t: 'Spelling', intro: 'Say each word slowly and listen to every sound. Then check each letter.', learn: ['school','teacher','friend','because','beautiful','tomorrow','yesterday','breakfast','favourite','different'],
      gen: function (add, r) {
        var W = ['school','teacher','pencil','friend','mother','father','sister','brother','water','bread','house','garden','flower','yellow','orange','purple','morning','evening','birthday','holiday','picture','animal','elephant','umbrella','beautiful','because','people','always','together','favourite','carefully','important','different','remember','tomorrow','yesterday','breakfast','afternoon','chocolate','delicious','sometimes','window','kitchen','rabbit','monkey','thirsty','hungry','winter','summer','question'];
        W.forEach(function (w) {
          var v = [], n = w.length, m = Math.floor(n / 2);
          v.push(w.slice(0, m) + w.slice(m + 1));
          v.push(w.slice(0, 2) + w[1] + w.slice(2));
          var k = n - 3; v.push(w.slice(0, k) + w[k + 1] + w[k] + w.slice(k + 2));
          var vi = w.slice(1).search(/[aeiou]/) + 1; if (vi > 0) { var nv = 'aeiou'.replace(w[vi], '')[ri(r, 0, 3)]; v.push(w.slice(0, vi) + nv + w.slice(vi + 1)); }
          var u = []; v.forEach(function (x) { if (x !== w && u.indexOf(x) < 0) u.push(x); });
          add({ q: 'Which spelling is correct?', o: shuffle([w].concat(u.slice(0, 3)), r), a: w, e: 'The correct spelling is "' + w + '".' });
          add({ q: 'Is this spelled correctly: "' + w + '"?', o: ['Yes', 'No'], a: 'Yes', e: '"' + w + '" is spelled correctly.' });
          add({ q: 'Is this spelled correctly: "' + u[0] + '"?', o: ['Yes', 'No'], a: 'No', e: 'The correct spelling is "' + w + '".' });
        });
      } },
    { id: 'eng-5', t: 'Rhyming words', intro: 'Rhyming words end with the same sound, like cat and hat.', sets: [
      { pairs: [['cat','hat'],['sun','fun'],['ball','tall'],['cake','lake'],['bee','tree'],['star','car'],['ring','king'],['fish','dish'],['bed','red'],['moon','spoon'],['rain','train'],['goat','boat'],['mouse','house'],['frog','log']], q: 'Which word rhymes with "{x}"?', tf: '"{x}" rhymes with "{y}".', rev: 'Which word rhymes with "{x}"?' }] }
  ] },
  { id: 'urd', name: 'Urdu', sub: 'اردو', glyph: 'اب', color: '#1F7A6B', rtl: true, chapters: [
    { id: 'urd-1', t: 'حروفِ تہجی', intro: 'اردو حروفِ تہجی سیکھیں۔ ہر حرف سے ایک لفظ شروع ہوتا ہے۔', sets: [
      { pairs: [['ا','انار'],['ب','بکری'],['پ','پتنگ'],['ت','تتلی'],['ٹ','ٹماٹر'],['ج','جہاز'],['چ','چڑیا'],['خ','خرگوش'],['د','دروازہ'],['ڈ','ڈبہ'],['ر','رسی'],['ز','زرافہ'],['س','سیب'],['ش','شیر'],['ک','کتاب'],['گ','گھوڑا'],['ل','لڑکا'],['م','مچھلی'],['ن','ناشپاتی'],['ہ','ہاتھی']], q: 'حرف «{x}» سے کون سا لفظ شروع ہوتا ہے؟', tf: 'لفظ «{y}» حرف «{x}» سے شروع ہوتا ہے۔', rev: 'لفظ «{x}» کس حرف سے شروع ہوتا ہے؟' }] },
    { id: 'urd-2', t: 'متضاد الفاظ', intro: 'متضاد الفاظ ایک دوسرے کا الٹ ہوتے ہیں، جیسے دن اور رات۔', sets: [
      { pairs: [['دن','رات'],['اچھا','برا'],['اوپر','نیچے'],['بڑا','چھوٹا'],['گرم','ٹھنڈا'],['سچ','جھوٹ'],['آنا','جانا'],['خوش','اداس'],['امیر','غریب'],['صاف','گندا'],['روشنی','اندھیرا'],['دوست','دشمن'],['آگے','پیچھے'],['نیا','پرانا']], q: '«{x}» کا متضاد کیا ہے؟', tf: '«{x}» کا متضاد «{y}» ہے۔', rev: '«{x}» کا متضاد کیا ہے؟' }] },
    { id: 'urd-3', t: 'واحد جمع', intro: 'ایک چیز کو واحد اور ایک سے زیادہ چیزوں کو جمع کہتے ہیں۔', sets: [
      { pairs: [['کتاب','کتابیں'],['لڑکا','لڑکے'],['لڑکی','لڑکیاں'],['کمرہ','کمرے'],['بات','باتیں'],['بچہ','بچے'],['کرسی','کرسیاں'],['آنکھ','آنکھیں'],['چڑیا','چڑیاں'],['کپڑا','کپڑے'],['رات','راتیں'],['مرغی','مرغیاں']], q: '«{x}» کی جمع کیا ہے؟', tf: '«{x}» کی جمع «{y}» ہے۔', rev: '«{x}» کا واحد کیا ہے؟' }] },
    { id: 'urd-4', t: 'گنتی', intro: 'اردو میں ایک سے بیس تک گنتی سیکھیں۔', sets: [
      { pairs: [[1,'ایک'],[2,'دو'],[3,'تین'],[4,'چار'],[5,'پانچ'],[6,'چھ'],[7,'سات'],[8,'آٹھ'],[9,'نو'],[10,'دس'],[11,'گیارہ'],[12,'بارہ'],[13,'تیرہ'],[14,'چودہ'],[15,'پندرہ'],[16,'سولہ'],[17,'سترہ'],[18,'اٹھارہ'],[19,'انیس'],[20,'بیس']].map(function (p) { return [urNum(p[0]), p[1]]; }),
        q: 'عدد {x} کو لفظوں میں کیسے لکھتے ہیں؟', tf: 'عدد {x} کو «{y}» لکھتے ہیں۔', rev: '«{x}» کا عدد کون سا ہے؟' }] }
  ] },
  { id: 'math', name: 'Mathematics', glyph: '123', color: '#D9483B', chapters: [
    { id: 'math-1', t: 'Numbers up to 1000', intro: 'Every 3-digit number has hundreds, tens and ones. In 346 there are 3 hundreds, 4 tens and 6 ones.', learn: ['346 = 300 + 40 + 6', 'The number after 299 is 300', '507 is "five hundred and seven"', 'The greatest number has the most hundreds'],
      gen: function (add, r) {
        var names = ['hundreds', 'tens', 'ones'], val = [100, 10, 1];
        for (var k = 0; k < 150; k++) {
          var n = ri(r, 100, 999), d = [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10], p = k % 3;
          if (d[p] > 0) add({ q: 'In ' + n + ', what is the value of the ' + names[p] + ' digit?', o: numOpts(d[p] * val[p], r, [d[p] * 100, d[p] * 10, d[p]]), a: d[p] * val[p], e: 'The ' + names[p] + ' digit is ' + d[p] + ', so its value is ' + d[p] * val[p] + '.' });
          var t = k % 4;
          if (t === 0) add({ q: 'Which number comes just after ' + n + '?', o: numOpts(n + 1, r, [n - 1, n + 10, n + 2]), a: n + 1, e: 'Just after ' + n + ' comes ' + (n + 1) + '.' });
          if (t === 1) add({ q: 'Which number comes just before ' + n + '?', o: numOpts(n - 1, r, [n + 1, n - 10, n - 2]), a: n - 1, e: 'Just before ' + n + ' comes ' + (n - 1) + '.' });
          if (t === 2) { var sw = d[2] * 100 + d[1] * 10 + d[0]; add({ q: 'Write in numbers: ' + words(n), o: numOpts(n, r, [sw > 99 ? sw : n + 100, n + 10]), a: n, e: words(n) + ' is written ' + n + '.' }); }
          if (t === 3) { var set = [n]; while (set.length < 4) { var m = ri(r, 100, 999); if (set.indexOf(m) < 0) set.push(m); } var mx = Math.max.apply(null, set); add({ q: 'Which number is the greatest?', o: shuffle(set, r), a: mx, e: mx + ' is the greatest.' }); }
        }
      } },
    { id: 'math-2', t: 'Addition', intro: 'Add the ones first, then the tens, then the hundreds. If the ones make 10 or more, carry 1 ten to the tens column.', learn: ['24 + 13 = 37', '38 + 25 = 63 (carry 1)', '245 + 32 = 277'],
      gen: function (add, r) {
        for (var k = 0; k < 360; k++) {
          var a, b, ty = k % 3;
          if (ty === 0) { a = ri(r, 10, 49); b = ri(r, 10, 49); } else if (ty === 1) { a = ri(r, 10, 99); b = ri(r, 10, 99); } else { a = ri(r, 100, 899); b = ri(r, 10, 99); }
          var s = a + b, c = [s - 10, s + 10, s + 1];
          if (k % 4 === 3) { var nm = NAMES[k % NAMES.length]; add({ q: nm + ' has ' + a + ' marbles. ' + nm + ' gets ' + b + ' more. How many marbles now?', o: numOpts(s, r, c), a: s, e: a + ' + ' + b + ' = ' + s }); }
          else add({ q: a + ' + ' + b + ' = ?', o: numOpts(s, r, c), a: s, e: a + ' + ' + b + ' = ' + s });
        }
      } },
    { id: 'math-3', t: 'Subtraction', intro: 'Take away the ones first, then the tens. If the top ones digit is smaller, borrow 1 ten.', learn: ['48 - 15 = 33', '52 - 27 = 25 (borrow 1 ten)', '365 - 41 = 324'],
      gen: function (add, r) {
        for (var k = 0; k < 360; k++) {
          var a, b, ty = k % 3;
          if (ty === 0) { a = ri(r, 20, 99); b = ri(r, 10, a - 1); } else if (ty === 1) { a = ri(r, 50, 99); b = ri(r, 11, a - 10); } else { a = ri(r, 150, 999); b = ri(r, 10, 99); }
          var d = a - b, c = [d + 10, d - 10, a + b > 999 ? d + 1 : d + 2];
          if (k % 4 === 3) { add({ q: 'There were ' + a + ' birds on a tree. ' + b + ' flew away. How many are left?', o: numOpts(d, r, c), a: d, e: a + ' - ' + b + ' = ' + d }); }
          else add({ q: a + ' - ' + b + ' = ?', o: numOpts(d, r, c), a: d, e: a + ' - ' + b + ' = ' + d });
        }
      } },
    { id: 'math-4', t: 'Multiplication tables', intro: 'Multiplication is quick adding of equal groups. 3 × 4 means 3 groups of 4, which is 12.', learn: ['2 × 6 = 12', '5 × 7 = 35', '9 × 8 = 72', '10 × 12 = 120'],
      gen: function (add, r) {
        for (var a = 2; a <= 10; a++) for (var b = 1; b <= 12; b++) {
          var p = a * b;
          add({ q: a + ' × ' + b + ' = ?', o: numOpts(p, r, [p + a, p - a, a + b]), a: p, e: a + ' × ' + b + ' = ' + p });
          add({ q: a + ' × ? = ' + p, o: numOpts(b, r, [b + 1, b - 1, b + 2]), a: b, e: a + ' × ' + b + ' = ' + p });
          if (b <= 10) add({ q: 'There are ' + b + ' plates with ' + a + ' samosas on each. How many samosas in all?', o: numOpts(p, r, [p + a, p - a, a + b]), a: p, e: b + ' groups of ' + a + ' = ' + p });
        }
      } },
    { id: 'math-5', t: 'Division', intro: 'Division is sharing equally. 12 ÷ 3 = 4 means 12 shared into 3 equal groups gives 4 in each.', learn: ['10 ÷ 2 = 5', '20 ÷ 4 = 5', '27 ÷ 3 = 9'],
      gen: function (add, r) {
        for (var d = 2; d <= 10; d++) for (var q = 1; q <= 10; q++) {
          var n = d * q;
          add({ q: n + ' ÷ ' + d + ' = ?', o: numOpts(q, r, [q + 1, q - 1, d]), a: q, e: n + ' ÷ ' + d + ' = ' + q + ' because ' + d + ' × ' + q + ' = ' + n });
          add({ q: 'Share ' + n + ' sweets equally among ' + d + ' children. How many does each child get?', o: numOpts(q, r, [q + 1, q - 1, q + 2]), a: q, e: n + ' ÷ ' + d + ' = ' + q });
        }
      } },
    { id: 'math-6', t: 'Time and money', intro: 'The short hand shows the hour. The long hand shows the minutes: on 12 it is o\'clock, on 3 it is quarter past, on 6 it is half past. In Pakistan we use rupees (Rs.).', sets: [
      { pairs: [['How many minutes are in one hour?','60'],['How many hours are in one day?','24'],['How many days are in one week?','7'],['How many seconds are in one minute?','60'],['How many hours does the short hand take to go once round the clock?','12']], q: '{x}' }],
      gen: function (add, r) {
        for (var h = 1; h <= 12; h++) {
          var nx = h % 12 + 1, pool = [h + " o'clock", 'half past ' + h, 'quarter past ' + h, nx + " o'clock", 'half past ' + nx];
          [['12', h + " o'clock"], ['6', 'half past ' + h], ['3', 'quarter past ' + h]].forEach(function (z) {
            add({ q: 'The short hand is at ' + h + ' and the long hand is on ' + z[0] + '. What time is it?', o: shuffle([z[1]].concat(shuffle(pool.filter(function (x) { return x !== z[1]; }), r).slice(0, 3)), r), a: z[1], e: 'Long hand on ' + z[0] + ' with the short hand at ' + h + ' means ' + z[1] + '.' });
          });
        }
        var notes = [10, 20, 50, 100];
        for (var k = 0; k < 60; k++) {
          var n1 = notes[ri(r, 0, 3)], n2 = notes[ri(r, 0, 3)], s = n1 + n2, nm = NAMES[k % NAMES.length];
          add({ q: nm + ' has a Rs. ' + n1 + ' note and a Rs. ' + n2 + ' note. How much money is that?', o: numOpts(s, r, [s + 10, s - 10, n1 * n2 > 1000 ? s + 20 : s + 30]).map(function (x) { return 'Rs. ' + x; }), a: 'Rs. ' + s, e: 'Rs. ' + n1 + ' + Rs. ' + n2 + ' = Rs. ' + s });
          var pay = k % 2 ? 100 : 50, cost = 5 * ri(r, 1, pay / 5 - 1), ch = pay - cost;
          add({ q: 'A pencil box costs Rs. ' + cost + '. You pay Rs. ' + pay + '. How much change do you get?', o: numOpts(ch, r, [ch + 10, ch - 5, ch + 5]).map(function (x) { return 'Rs. ' + x; }), a: 'Rs. ' + ch, e: 'Rs. ' + pay + ' - Rs. ' + cost + ' = Rs. ' + ch });
        }
      } },
    { id: 'math-7', t: 'Shapes and fractions', intro: 'Shapes have sides and corners. A fraction is a part of a whole: one half is 1 of 2 equal parts, one quarter is 1 of 4 equal parts.', sets: [
      { pairs: [['triangle','3'],['square','4'],['rectangle','4'],['pentagon','5'],['hexagon','6'],['circle','0']], q: 'How many straight sides does a {x} have?', tf: 'A {x} has {y} straight sides.' }],
      gen: function (add, r) {
        for (var n = 2; n <= 40; n += 2) add({ q: 'What is half of ' + n + '?', o: numOpts(n / 2, r, [n, n / 2 + 1, n - 2]), a: n / 2, e: 'Half of ' + n + ' is ' + n / 2 + ' because ' + n / 2 + ' + ' + n / 2 + ' = ' + n + '.' });
        for (var m = 4; m <= 40; m += 4) add({ q: 'What is one quarter of ' + m + '?', o: numOpts(m / 4, r, [m / 2, m / 4 + 1, m]), a: m / 4, e: 'Share ' + m + ' into 4 equal parts: each part is ' + m / 4 + '.' });
        [['A roti is cut into 2 equal pieces. What is one piece called?', 'one half'], ['A cake is cut into 4 equal pieces. What is one piece called?', 'one quarter'], ['How many halves make a whole?', 'two'], ['How many quarters make a whole?', 'four']].forEach(function (z) {
          var pool = ['one half', 'one quarter', 'two', 'four', 'three'].filter(function (x) { return x !== z[1]; });
          add({ q: z[0], o: shuffle([z[1]].concat(shuffle(pool, r).slice(0, 3)), r), a: z[1], e: 'The answer is ' + z[1] + '.' });
        });
      } }
  ] },
  { id: 'sci', name: 'Science', glyph: 'Sc', color: '#3A9A4A', chapters: [
    { id: 'sci-1', t: 'Living and non-living things', intro: 'Living things grow, eat, breathe and have young ones. Non-living things do not.', sets: [
      { pairs: [['dog','living'],['tree','living'],['bird','living'],['fish','living'],['flower','living'],['cow','living'],['butterfly','living'],['grass','living'],['stone','non-living'],['chair','non-living'],['car','non-living'],['book','non-living'],['ball','non-living'],['water bottle','non-living'],['pencil','non-living']], q: 'Is a {x} living or non-living?', tf: 'A {x} is {y}.' }] },
    { id: 'sci-2', t: 'Our body and senses', intro: 'We have five senses: sight, hearing, smell, taste and touch. Our body parts each have a job.', sets: [
      { h: 'Five senses', pairs: [['eyes','see'],['ears','hear'],['nose','smell'],['tongue','taste'],['skin','feel and touch']], q: 'What do we do with our {x}?', tf: 'We {y} with our {x}.', rev: 'Which part of the body helps us {x}?' },
      { h: 'Body parts', pairs: [['heart','pump blood around the body'],['lungs','help us breathe'],['brain','help us think'],['stomach','help digest our food'],['bones','give our body its shape']], q: 'What is the job of the {x}?', tf: 'The job of the {x} is to {y}.' }] },
    { id: 'sci-3', t: 'Plants', intro: 'Plants need sunlight, water and air to grow. Each part of a plant has a job.', sets: [
      { h: 'Parts of a plant', pairs: [['roots','take in water from the soil'],['stem','hold the plant up'],['leaves','make food for the plant'],['flower','turn into fruit and seeds'],['seed','grow into a new plant']], q: 'What is the job of the {x}?', tf: 'The job of the {x} is to {y}.' },
      { h: 'Plants we eat', pairs: [['carrot','root'],['spinach','leaf'],['potato','stem'],['mango','fruit'],['cauliflower','flower'],['pea','seed']], q: 'We eat the … of the {x} plant.', tf: 'We eat the {y} of the {x} plant.' }] },
    { id: 'sci-4', t: 'Animals and their homes', intro: 'Animals live in different homes, and their babies have special names.', sets: [
      { h: 'Homes', pairs: [['lion','den'],['bird','nest'],['bee','hive'],['horse','stable'],['dog','kennel'],['spider','web'],['rabbit','burrow'],['cow','shed']], q: 'Where does a {x} live?', tf: 'A {x} lives in a {y}.', rev: 'Which animal lives in a {x}?' },
      { h: 'Young ones', pairs: [['cat','kitten'],['dog','puppy'],['cow','calf'],['hen','chick'],['sheep','lamb'],['horse','foal'],['goat','kid'],['duck','duckling']], q: 'What is the baby of a {x} called?', tf: 'The baby of a {x} is called a {y}.', rev: 'A {x} is the baby of which animal?' }] },
    { id: 'sci-5', t: 'Water and weather', intro: 'Water can be a solid (ice), a liquid (water) or a gas (steam). Pakistan has hot summers, cold winters and monsoon rain.', sets: [
      { h: 'States of water', pairs: [['ice','solid'],['water','liquid'],['steam','gas']], q: '{x} is a…', tf: '{x} is a {y}.' },
      { h: 'Seasons', pairs: [['the hottest season','summer'],['the coldest season','winter'],['the season when flowers bloom','spring'],['the season when leaves fall','autumn'],['the season of heavy rain in Pakistan','monsoon']], q: 'Which is {x}?', tf: '{y} is {x}.' }] }
  ] },
  { id: 'sst', name: 'Social Studies', glyph: 'SS', color: '#8A5A2B', chapters: [
    { id: 'sst-1', t: 'My family and home', intro: 'A family lives together and cares for each other. A home has rooms for different jobs.', sets: [
      { h: 'Family', pairs: [["father's father",'grandfather (dada)'],["father's mother",'grandmother (dadi)'],["mother's father",'grandfather (nana)'],["mother's mother",'grandmother (nani)'],["mother's sister",'aunt (khala)'],["father's brother",'uncle (chacha)'],["mother's brother",'uncle (mamoon)'],["father's sister",'aunt (phuphi)']], q: 'Who is your {x}?', tf: 'Your {x} is your {y}.' },
      { h: 'Rooms', pairs: [['cook food','kitchen'],['sleep at night','bedroom'],['take a bath','bathroom'],['sit with guests','drawing room']], q: 'In which room do we {x}?', tf: 'We {x} in the {y}.', rev: 'What do we do in the {x}?' }] },
    { id: 'sst-2', t: 'Community helpers', intro: 'Community helpers work to keep us healthy, safe and happy.', sets: [
      { pairs: [['treats sick people','doctor'],['teaches children','teacher'],['delivers letters','postman'],['puts out fires','firefighter'],['keeps us safe','police officer'],['grows crops','farmer'],['bakes bread','baker'],['fixes leaking pipes','plumber'],['makes wooden furniture','carpenter'],['cuts hair','barber'],['flies an aeroplane','pilot'],['stitches clothes','tailor']], q: 'Who {x}?', tf: 'A {y} {x}.', rev: 'What does a {x} do?' }] },
    { id: 'sst-3', t: 'Our country Pakistan', intro: 'Pakistan came into being on 14 August 1947. Islamabad is its capital and it has four provinces.', sets: [
      { h: 'Capitals', pairs: [['Pakistan','Islamabad'],['Punjab','Lahore'],['Sindh','Karachi'],['Khyber Pakhtunkhwa','Peshawar'],['Balochistan','Quetta'],['Gilgit-Baltistan','Gilgit']], q: 'What is the capital of {x}?', tf: 'The capital of {x} is {y}.', rev: '{x} is the capital of…' },
      { h: 'National symbols', pairs: [['animal','the Markhor'],['bird','the Chukar partridge'],['flower','Jasmine'],['tree','the Deodar'],['sport','Hockey'],['language','Urdu'],['fruit','the Mango']], q: 'What is the national {x} of Pakistan?', tf: 'The national {x} of Pakistan is {y}.' },
      { h: 'Great people and days', pairs: [['Who is the founder of Pakistan?','Quaid-e-Azam Muhammad Ali Jinnah'],['Who is the national poet of Pakistan?','Allama Muhammad Iqbal'],['When is Independence Day?','14 August'],['When is Pakistan Day?','23 March']], q: '{x}' }] },
    { id: 'sst-4', t: 'Means of transport', intro: 'We travel on land, on water and in the air.', sets: [
      { pairs: [['car','on land'],['train','on land'],['bus','on land'],['bicycle','on land'],['rickshaw','on land'],['ship','on water'],['boat','on water'],['submarine','on water'],['aeroplane','in the air'],['helicopter','in the air']], q: 'Where does a {x} travel?', tf: 'A {x} travels {y}.' }] }
  ] },
  { id: 'isl', name: 'Islamiyat', glyph: 'Is', color: '#146C5B', chapters: [
    { id: 'isl-1', t: 'Pillars of Islam', intro: 'Islam has five pillars: Shahadah, Salah, Sawm, Zakat and Hajj. Muslims offer five prayers every day.', sets: [
      { h: 'Five pillars', pairs: [['believing and saying the Kalima','Shahadah (Kalima)'],['praying five times a day','Salah (Namaz)'],['fasting in the month of Ramadan','Sawm (Roza)'],['giving a part of our wealth to the poor','Zakat'],['visiting the Kaaba in Makkah','Hajj']], q: 'Which pillar of Islam is {x}?', tf: '{x} is the pillar called {y}.', rev: 'What is {x}?' },
      { h: 'Five daily prayers', pairs: [['at dawn, before sunrise','Fajr'],['after midday','Zuhr'],['in the afternoon','Asr'],['just after sunset','Maghrib'],['at night','Isha']], q: 'Which prayer is offered {x}?', tf: '{y} is offered {x}.', rev: 'When is {x} offered?' }] },
    { id: 'isl-2', t: 'Our Holy Prophet ﷺ', intro: 'Hazrat Muhammad ﷺ is the last Prophet of Allah. He was born in Makkah.', sets: [
      { pairs: [['Where was the Holy Prophet ﷺ born?','Makkah'],['What was the name of his mother?','Hazrat Aminah'],['What was the name of his father?','Hazrat Abdullah'],['Which grandfather looked after him as a child?','Hazrat Abdul Muttalib'],['In which cave did the first revelation come?','Cave Hira'],['To which city did he migrate?','Madinah'],['Which holy book was revealed to him?','The Holy Quran'],['Which angel brought the revelation?','Hazrat Jibraeel (AS)']], q: '{x}' }] },
    { id: 'isl-3', t: 'Prophets of Allah', intro: 'Allah sent many prophets to guide people. Hazrat Adam (AS) was the first and Hazrat Muhammad ﷺ is the last.', sets: [
      { pairs: [['Who was the first prophet?','Hazrat Adam (AS)'],['Which prophet built the Ark, a very big boat?','Hazrat Nuh (AS)'],['Which prophet built the Kaaba with his son?','Hazrat Ibrahim (AS)'],['Which prophet spoke with Allah at Mount Toor?','Hazrat Musa (AS)'],['Which prophet was swallowed by a big fish?','Hazrat Yunus (AS)'],['Who is the last prophet?','Hazrat Muhammad ﷺ']], q: '{x}' }] },
    { id: 'isl-4', t: 'Islamic manners and months', intro: 'Muslims remember Allah in everyday life. The Islamic year has twelve months.', sets: [
      { h: 'What do we say?', pairs: [['before eating','Bismillah'],['after eating','Alhamdulillah'],['when we meet someone','Assalamu Alaikum'],['when we plan to do something','InshaAllah'],['when we see something beautiful','MashaAllah'],['when someone helps us','JazakAllah']], q: 'What do we say {x}?', tf: 'We say "{y}" {x}.', rev: 'When do we say "{x}"?' },
      { h: 'Islamic months', pairs: [['the month of fasting','Ramadan'],['the month of Hajj','Dhul Hijjah'],['the first month of the Islamic year','Muharram'],['the month of Eid ul Fitr','Shawwal']], q: 'Which is {x}?', tf: '{y} is {x}.', rev: 'What is {x}?' }] }
  ] },
  { id: 'comp', name: 'Computer', glyph: 'PC', color: '#5B4FB3', chapters: [
    { id: 'comp-1', t: 'Parts of a computer', intro: 'A computer has a monitor, keyboard, mouse and CPU. Some computers also have speakers and a printer.', sets: [
      { pairs: [['monitor','showing words and pictures'],['keyboard','typing letters and numbers'],['mouse','pointing and clicking'],['CPU','doing all the thinking and working'],['speaker','giving out sound'],['printer','printing on paper']], q: 'What is the {x} used for?', tf: 'The {x} is used for {y}.', rev: 'Which part is used for {x}?' }] },
    { id: 'comp-2', t: 'Input and output devices', intro: 'Input devices put information into the computer. Output devices show or give information out.', sets: [
      { pairs: [['keyboard','input device'],['mouse','input device'],['microphone','input device'],['scanner','input device'],['webcam','input device'],['monitor','output device'],['printer','output device'],['speaker','output device'],['headphones','output device']], q: 'Is a {x} an input device or an output device?', tf: 'A {x} is an {y}.' }] },
    { id: 'comp-3', t: 'The keyboard', intro: 'Special keys on the keyboard help us type neatly.', sets: [
      { pairs: [['Space','puts a space between words'],['Enter','takes the cursor to a new line'],['Backspace','deletes the letter on the left'],['Delete','deletes the letter on the right'],['Shift','types one capital letter while held down'],['Caps Lock','types all letters in capitals']], q: 'What does the {x} key do?', tf: 'The {x} key {y}.', rev: 'Which key {x}?' }] }
  ] },
  { id: 'gk', name: 'General Knowledge', glyph: 'GK', color: '#C77D0A', chapters: [
    { id: 'gk-1', t: 'Pakistan and Jhelum', intro: 'Jhelum is a city on the River Jhelum in Punjab. Rohtas Fort and Mangla Dam are nearby.', sets: [
      { pairs: [['Which river flows past Jhelum city?','River Jhelum'],['Which famous fort near Jhelum was built by Sher Shah Suri?','Rohtas Fort'],['Which big dam is on the River Jhelum?','Mangla Dam'],['Which is the largest city of Pakistan?','Karachi'],['Which is the highest mountain in Pakistan?','K2'],['Which is the longest river in Pakistan?','River Indus'],['Which big mosque is in Islamabad?','Faisal Mosque'],['What colours are on the flag of Pakistan?','Green and white']], q: '{x}' }] },
    { id: 'gk-2', t: 'The world around us', intro: 'We live on planet Earth. The Sun gives us light and the Moon goes round the Earth.', sets: [
      { pairs: [['What is the largest animal in the world?','The blue whale'],['What is the tallest animal?','The giraffe'],['What is the fastest land animal?','The cheetah'],['Which planet do we live on?','Earth'],['Which star gives us light and heat?','The Sun'],['What goes round the Earth and shines at night?','The Moon'],['Which is the biggest ocean?','The Pacific Ocean']], q: '{x}' }] },
    { id: 'gk-3', t: 'Days and months', intro: 'A week has 7 days and a year has 12 months.', sets: [
      { pairs: [['How many days are in a week?','7'],['How many months are in a year?','12'],['How many days are in a year?','365'],['Which is the first month of the year?','January'],['Which is the last month of the year?','December'],['Which month is the shortest?','February']], q: '{x}' }],
      gen: function (add, r) {
        var D = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], M = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        function ask(L, i, after) { var a = after ? L[(i + 1) % L.length] : L[(i + L.length - 1) % L.length]; add({ q: 'Which ' + (L.length === 7 ? 'day' : 'month') + ' comes ' + (after ? 'after ' : 'before ') + L[i] + '?', o: shuffle([a].concat(shuffle(L.filter(function (x) { return x !== a && x !== L[i]; }), r).slice(0, 3)), r), a: a, e: (after ? 'After ' : 'Before ') + L[i] + ' comes ' + a + '.' }); }
        D.forEach(function (x, i) { ask(D, i, true); ask(D, i, false); });
        M.forEach(function (x, i) { ask(M, i, true); ask(M, i, false); });
      } },
    { id: 'gk-4', t: 'Colours around us', intro: 'Everything around us has colours. Look closely!', sets: [
      { pairs: [['a clear sky','blue'],['fresh grass','green'],['a ripe banana','yellow'],['snow','white'],['coal','black'],['a ripe tomato','red'],['a ripe orange','orange'],['a crow','black'],['milk','white']], q: 'What colour is {x}?', tf: '{x} is {y}.' }] }
  ] },
  { id: 'moral', name: 'Moral Education', glyph: 'Mo', color: '#B8457A', chapters: [
    { id: 'moral-1', t: 'Good manners', intro: 'Good manners make everyone happy. Say please, thank you and sorry.', sets: [
      { pairs: [['someone gives you a gift','Say "Thank you"'],['you bump into someone','Say "Sorry"'],['you ask for something','Say "Please"'],['an elder comes into the room','Stand up and greet them'],['you want to speak in class','Raise your hand'],['your friend is sad','Comfort and help them']], q: 'What should you do when {x}?', tf: 'When {x}: {y}.' }] },
    { id: 'moral-2', t: 'Honesty', intro: 'An honest person always tells the truth, even when it is hard.', sets: [
      { pairs: [['you find a lost wallet at school','Give it to the teacher'],['you break a glass by mistake','Tell your parents the truth'],['a shopkeeper gives you too much change','Give back the extra money'],['you have not done your homework','Tell the teacher honestly'],['you want to use a friend\'s pencil','Ask before taking it']], q: 'What should you do when {x}?', tf: 'When {x}: {y}.' }] },
    { id: 'moral-3', t: 'Cleanliness', intro: 'Cleanliness is half of faith. Keep your body, home and school clean.', sets: [
      { pairs: [['wash our hands','before eating and after using the toilet'],['brush our teeth','in the morning and at night'],['cut our nails','once a week'],['take a bath','every day']], q: 'When should we {x}?', tf: 'We should {x} {y}.' }] },
    { id: 'moral-4', t: 'Helping others and nature', intro: 'We should help people and take care of water, electricity and plants.', sets: [
      { pairs: [['an old man wants to cross the road','Help him cross safely'],['a tap is left running','Close it to save water'],['lights are on in an empty room','Switch them off'],['a plant is drying up','Give it water'],['a new student is alone','Make friends with them'],['you see litter on the ground','Put it in the dustbin']], q: 'What should you do when {x}?', tf: 'When {x}: {y}.' }] }
  ] },
  { id: 'arb', name: 'Arabic', sub: 'عربی', glyph: 'عر', color: '#2B7F9E', chapters: [
    { id: 'arb-1', t: 'Arabic letters', intro: 'Arabic is written from right to left. Learn the names of the letters.', sets: [
      { pairs: [['Alif','ا'],['Baa','ب'],['Taa','ت'],['Thaa','ث'],['Jeem','ج'],['Khaa','خ'],['Daal','د'],['Dhaal','ذ'],['Raa','ر'],['Zaay','ز'],['Seen','س'],['Sheen','ش'],['Saad','ص'],['Daad','ض'],['Ain','ع'],['Ghain','غ'],['Faa','ف'],['Qaaf','ق'],['Kaaf','ك'],['Laam','ل'],['Meem','م'],['Noon','ن'],['Waw','و'],['Yaa','ي']], q: 'Which Arabic letter is "{x}"?', rev: 'What is the name of this letter: {x}' }] },
    { id: 'arb-2', t: 'Numbers in Arabic', intro: 'Learn to count from one to ten in Arabic.', sets: [
      { pairs: [['1','واحد'],['2','اثنان'],['3','ثلاثة'],['4','أربعة'],['5','خمسة'],['6','ستة'],['7','سبعة'],['8','ثمانية'],['9','تسعة'],['10','عشرة']], q: 'How do we say {x} in Arabic?', rev: 'Which number is {x}?' }] },
    { id: 'arb-3', t: 'Simple Arabic words', intro: 'Many Arabic words are used in Urdu too, like kitaab and qalam.', sets: [
      { pairs: [['book','كتاب'],['pen','قلم'],['door','باب'],['house','بيت'],['water','ماء'],['sun','شمس'],['moon','قمر'],['boy','ولد'],['girl','بنت'],['teacher','معلّم'],['mosque','مسجد']], q: 'What is the Arabic word for "{x}"?', rev: 'What does {x} mean?' }] }
  ] },
  { id: 'art', name: 'Art and Colours', glyph: 'Ar', color: '#E0662F', chapters: [
    { id: 'art-1', t: 'Mixing colours', intro: 'Red, blue and yellow are primary colours. Mixing two of them makes a secondary colour.', sets: [
      { h: 'Mixing', pairs: [['red and yellow','orange'],['blue and yellow','green'],['red and blue','purple'],['red and white','pink'],['black and white','grey']], q: 'What colour do we get when we mix {x}?', tf: 'Mixing {x} makes {y}.' },
      { h: 'Primary or secondary', pairs: [['Red','primary'],['Blue','primary'],['Yellow','primary'],['Green','secondary'],['Orange','secondary'],['Purple','secondary']], q: '{x} is a … colour.', tf: '{x} is a {y} colour.' }] },
    { id: 'art-2', t: 'Shapes around us', intro: 'Look around: a coin is a circle, a door is a rectangle, a samosa is a triangle.', sets: [
      { pairs: [['a coin','circle'],['a door','rectangle'],['a samosa','triangle'],['a face of a dice','square'],['an egg','oval'],['the shape on our flag beside the moon','star']], q: 'What shape is {x}?', tf: 'The shape of {x} is: {y}.' }] },
    { id: 'art-3', t: 'Warm and cool colours', intro: 'Warm colours remind us of fire and the sun. Cool colours remind us of water and leaves.', sets: [
      { pairs: [['Red','warm'],['Orange','warm'],['Yellow','warm'],['Blue','cool'],['Green','cool'],['Purple','cool']], q: 'Is {x} a warm colour or a cool colour?', tf: '{x} is a {y} colour.' }] }
  ] }
  ];

  var SMAP = {}, CMAP = {}, BANK = [], qn = 0;
  SUBJ.forEach(function (s) { SMAP[s.id] = s; s.chapters.forEach(function (c) { c.s = s.id; CMAP[c.id] = c; }); });
  function addQ(s, c, o) {
    o.id = 'q' + (++qn); o.s = s.id; o.c = c.id; o.q = cap(String(o.q)); o.a = String(o.a); o.o = o.o.map(String);
    if (o.o.indexOf(o.a) < 0) return;
    BANK.push(o);
  }
  function pickOpts(ans, pool, r) { var u = []; pool.forEach(function (x) { if (x !== ans && u.indexOf(x) < 0) u.push(x); }); return shuffle([ans].concat(shuffle(u, r).slice(0, 3)), r); }
  function fromSet(s, c, set) {
    var ur = s.id === 'urd', ys = set.pairs.map(function (p) { return String(p[1]); }), xs = set.pairs.map(function (p) { return String(p[0]); });
    var TF = ur ? ['درست', 'غلط'] : ['True', 'False'], TFQ = ur ? 'درست یا غلط؟ ' : 'True or false? ';
    set.pairs.forEach(function (p) {
      var x = String(p[0]), y = String(p[1]);
      var truth = set.tf ? cap(fill(set.tf, x, y)) : (ur ? 'درست جواب: ' : 'The answer is: ') + y;
      addQ(s, c, { q: fill(set.q, x, y), o: pickOpts(y, ys, R), a: y, e: truth });
      if (set.rev && ys.filter(function (v) { return v === y; }).length === 1) addQ(s, c, { q: fill(set.rev, y, x), o: pickOpts(x, xs, R), a: x, e: set.tf ? truth : x + ' = ' + y });
      if (set.tf) {
        addQ(s, c, { q: TFQ + truth, o: TF, a: TF[0], e: truth });
        var w = shuffle(ys.filter(function (v) { return v !== y; }), R)[0];
        if (w) addQ(s, c, { q: TFQ + cap(fill(set.tf, x, w)), o: TF, a: TF[1], e: truth });
      }
    });
  }
  SUBJ.forEach(function (s) { s.chapters.forEach(function (c) {
    (c.sets || []).forEach(function (set) { fromSet(s, c, set); });
    if (c.gen) c.gen(function (o) { addQ(s, c, o); }, R);
  }); });
  return { SUBJ: SUBJ, SMAP: SMAP, CMAP: CMAP, BANK: BANK, rng: rng, ri: ri, shuffle: shuffle };
})();
