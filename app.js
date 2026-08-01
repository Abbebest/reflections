/* ═══ Supabase ═══ */
  const SUPABASE_URL = "https://felzsezfkdtnvvdbqwbr.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlbHpzZXpma2R0bnZ2ZGJxd2JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwMDU5NjMsImV4cCI6MjEwMDU4MTk2M30.I3TozJX0HZozrRSw4FqNuwJjG726ZWyJot7fTmYsWf4";
  const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  function wm(file,w){ return "https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(file)+"?width="+(w||1000); }

  const quotes = [
    { id:"q1",  text:"على قدرِ أهلِ العزمِ تأتي العزائمُ، وتأتي على قدرِ الكرامِ المكارمُ.", author:"المتنبي", cat:"حكمة", img:wm("The Palace Guard by Ludwig Deutsch, 1900.jpg"), topics:["العزيمة","الطموح","النفس"] },
    { id:"q2",  text:"الخيلُ والليلُ والبيداءُ تعرفني، والسيفُ والرمحُ والقرطاسُ والقلمُ.", author:"المتنبي", cat:"أدب", img:wm("Maqama 43 Abu Zayd and al-Harith travelling.jpg"), topics:["الفخر","الأدب","الشجاعة"] },
    { id:"q3",  text:"ذو العقلِ يشقى في النعيمِ بعقلِه، وأخو الجهالةِ في الشقاوةِ ينعمُ.", author:"المتنبي", cat:"حياة", img:wm("The Water Seller Ludwig Deutsch.jpg"), topics:["العقل","الحياة","المعرفة"] },
    { id:"q4",  text:"وإذا كانت النفوسُ كباراً، تعبتْ في مرادِها الأجسامُ.", author:"المتنبي", cat:"حكمة", img:wm("Ludwig Deutsch - The Tribute.jpg"), topics:["النفس","الطموح","الجسد"] },
    { id:"q5",  text:"بقدرِ الكدِّ تُكتسبُ المعالي، ومن طلب العلا سهر الليالي.", author:"الإمام الشافعي", cat:"حكمة", img:wm("Maqamat hariri.jpg"), topics:["العلم","الاجتهاد","الصبر"] },
    { id:"q6",  text:"قيمةُ كلِّ امرئٍ ما يُحسنُه.", author:"علي بن أبي طالب", cat:"حكمة", img:wm("A Library in Golden Islamic Age.jpg"), topics:["النفس","العمل","المعرفة"] },
    { id:"q7",  text:"الناسُ نيامٌ، فإذا ماتوا انتبهوا.", author:"علي بن أبي طالب", cat:"حياة", img:wm("Ludwig Deutsch - Guarding the Palace, 1888.jpg"), topics:["الموت","الحياة","الوعي"] },
    { id:"q8",  text:"الحقيقةُ تحتاجُ إلى رجلين: واحدٍ لينطقَ بها، وآخرَ ليفهمَها.", author:"جبران خليل جبران", cat:"أدب", img:wm("Maqama 06 the Governor of Maraghah.jpg"), topics:["الحقيقة","المعرفة","الفهم"] },
    { id:"q9",  text:"الحبُّ الذي لا يتجدّدُ كلَّ يومٍ، يصيرُ عادةً ثم يصيرُ عبوديةً.", author:"جبران خليل جبران", cat:"حب", img:wm("Ludwig Deutsch - The Sahleb Vendor Cairo, 1886.jpg"), topics:["الحب","العادة","الحرية"] },
    { id:"q10", text:"الحياةُ التي لا يُتأمَّلُ فيها لا تستحقُّ أن تُعاشَ.", author:"سقراط", cat:"فلسفة", img:wm("Maqamat al-Hariri 1237, Turkic Emir portrait.jpg"), topics:["الحياة","التأمّل","النفس"] },
    { id:"q11", text:"الصديقُ روحٌ واحدةٌ تسكنُ جسدين.", author:"أرسطو", cat:"فلسفة", img:wm("Abu Zaid before the Governor of Rahba. Maqamat of al-Hariri, Baghdad 1237.jpg"), topics:["الصداقة","الحب","النفس"] },
    { id:"q12", text:"الحاجةُ أمُّ الاختراعِ.", author:"أفلاطون", cat:"فلسفة", img:wm("Ludwig Deutsch - The Nubian Palace Guard.jpg"), topics:["الحاجة","الإبداع","العقل"] },
    { id:"q13", text:"مَن له سببٌ يعيشُ من أجله، يحتملُ أيَّ طريقةٍ للعيشِ تقريباً.", author:"نيتشه", cat:"فلسفة", img:wm("Ludwig Deutsch- The Palace Guard.jpg"), topics:["المعنى","الحياة","الإرادة"] },
    { id:"q14", text:"أنا أفكّرُ، إذاً أنا موجودٌ.", author:"ديكارت", cat:"فلسفة", img:wm("Maqama 09 Abu Zayd and his wife before the Kadi of Alexandria, Egypt.jpg"), topics:["العقل","الوجود","المعرفة"] },
    { id:"q15", text:"الجهلُ يولّدُ الخوف، والخوفُ يولّدُ الكراهية، والكراهيةُ تولّدُ العنف.", author:"ابن رشد", cat:"فلسفة", img:wm("Early Morning, Id el-fitr by Ludwig Deutsch, 1902.jpg"), topics:["الجهل","الخوف","العقل"] },
    { id:"q16", text:"أمرُّ على الديارِ ديارِ ليلى، أُقبّلُ ذا الجدارَ وذا الجدارا.", author:"قيس بن الملوّح", cat:"حب", img:wm("Slaves Zadib Yemen 13th century BNF Paris.jpg"), topics:["الحب","الحنين","الوفاء"] },

    /* ═══ دفعة تراثية (ملكية عامة) — أضف المزيد على هذا النسق ═══ */
    { id:"q17", text:"السيفُ أصدقُ أنباءً من الكتبِ، في حدِّه الحدُّ بين الجِدِّ واللعبِ.", author:"أبو تمّام", cat:"أدب", topics:["الشجاعة","الحكمة","الجدّ"] },
    { id:"q18", text:"إذا غامرتَ في شرفٍ مرومٍ، فلا تقنعْ بما دونَ النجومِ.", author:"المتنبي", cat:"حكمة", topics:["الطموح","العزيمة","المجد"] },
    { id:"q19", text:"ومن يكُ ذا فمٍ مُرٍّ مريضٍ، يجدْ مُرّاً به الماءَ الزُّلالا.", author:"المتنبي", cat:"حكمة", topics:["النفس","الإدراك","الحياة"] },
    { id:"q20", text:"ومن يجعلِ المعروفَ من دونِ عِرضِه يَفِرْه، ومن لا يتّقِ الشتمَ يُشتَمِ.", author:"زهير بن أبي سُلمى", cat:"حكمة", topics:["الأخلاق","الكرامة","الحكمة"] },
    { id:"q21", text:"ومن هابَ أسبابَ المنايا ينلْنَه، ولو رامَ أسبابَ السماءِ بسُلّمِ.", author:"زهير بن أبي سُلمى", cat:"حياة", topics:["الموت","القدر","الشجاعة"] },
    { id:"q22", text:"ستُبدي لك الأيامُ ما كنتَ جاهلاً، ويأتيكَ بالأخبارِ من لم تُزوّدِ.", author:"طرفة بن العبد", cat:"حكمة", topics:["الزمن","التجربة","المعرفة"] },
    { id:"q23", text:"وإني وإن كنتُ الأخيرَ زمانُه، لآتٍ بما لم تستطعْه الأوائلُ.", author:"أبو العلاء المعرّي", cat:"أدب", topics:["الطموح","الاعتزاز","الأدب"] },
    { id:"q24", text:"دعِ الأيامَ تفعلُ ما تشاءُ، وطِبْ نفساً إذا حكمَ القضاءُ.", author:"الإمام الشافعي", cat:"حياة", topics:["الرضا","القدر","الصبر"] },
    { id:"q25", text:"ما حكَّ جلدَك مثلُ ظفرِك، فتولَّ أنتَ جميعَ أمرِك.", author:"الإمام الشافعي", cat:"حكمة", topics:["الاعتماد على النفس","العمل","الحكمة"] },
    { id:"q26", text:"العلمُ خيرٌ من المالِ؛ العلمُ يحرسُك وأنتَ تحرسُ المالَ.", author:"علي بن أبي طالب", cat:"حكمة", topics:["العلم","المعرفة","الحياة"] },
    { id:"q27", text:"لا تكنْ عبدَ غيرِك وقد جعلَك اللهُ حُرّاً.", author:"علي بن أبي طالب", cat:"حكمة", topics:["الحرية","الكرامة","النفس"] },
    { id:"q28", text:"نستطيعُ أن نسامحَ الطفلَ الذي يخافُ الظلام؛ لكنّ مأساةَ الحياةِ أن يخافَ الرجالُ النور.", author:"أفلاطون", cat:"فلسفة", topics:["المعرفة","الخوف","الحقيقة"] },
    { id:"q29", text:"الطبيعةُ لا تصنعُ شيئاً عبثاً.", author:"أرسطو", cat:"فلسفة", topics:["الطبيعة","الحكمة","الوجود"] },
    { id:"q30", text:"ليس لدينا وقتٌ قصير، بل نحن نُضيّعُ كثيراً منه.", author:"سينيكا", cat:"حياة", topics:["الزمن","الحياة","الحكمة"] },
    { id:"q31", text:"ما دمتَ حيّاً، فتعلّمْ كيف تعيش.", author:"سينيكا", cat:"حياة", topics:["الحياة","التعلّم","النفس"] },
    { id:"q32", text:"لكَ سلطانٌ على عقلِك، لا على الأحداثِ الخارجية؛ أدرِكْ هذا تجدِ القوّة.", author:"ماركوس أوريليوس", cat:"فلسفة", topics:["النفس","القوة","الرواقية"] },
    { id:"q33", text:"ليس ما يحدثُ لك، بل كيف تتعاملُ معه، هو ما يصنعُ الفرق.", author:"إبكتيتوس", cat:"فلسفة", topics:["النفس","الحكمة","الرواقية"] },
    { id:"q34", text:"لا يعبُرُ الإنسانُ النهرَ نفسَه مرّتين، فالماءُ يجري وهو يتغيّر.", author:"هيراقليطس", cat:"فلسفة", topics:["الزمن","التغيّر","الوجود"] },
    { id:"q35", text:"لا يهمُّ كم تسيرُ ببطءٍ، ما دمتَ لا تتوقّف.", author:"كونفوشيوس", cat:"حكمة", topics:["المثابرة","الصبر","الطموح"] },
    { id:"q36", text:"رحلةُ الألفِ ميلٍ تبدأُ بخطوةٍ واحدة.", author:"لاو تزو", cat:"حكمة", topics:["البداية","المثابرة","الحكمة"] },
    { id:"q37", text:"من لا يعرفُ إلى أيِّ مرفأٍ يتّجه، لا تُواتيهِ أيُّ ريح.", author:"سينيكا", cat:"حكمة", topics:["الهدف","الحياة","الحكمة"] },
    { id:"q38", text:"الصبرُ مفتاحُ الفرَج.", author:"مثلٌ عربيّ", cat:"حكمة", topics:["الصبر","الأمل","الحكمة"] },
    { id:"q39", text:"في التأنّي السلامةُ، وفي العَجَلةِ الندامةُ.", author:"مثلٌ عربيّ", cat:"حكمة", topics:["التأنّي","الحكمة","الحياة"] },
    { id:"q40", text:"اطلبوا العلمَ من المهدِ إلى اللحدِ.", author:"حكمةٌ مأثورة", cat:"حكمة", topics:["العلم","المعرفة","الحياة"] },

    /* ═══ دفعة منتقاة (ملكية عامة) — حكماء العرب والجاهلية ═══ */
    { id:"q41", text:"ومهما تكنْ عند امرئٍ من خليقةٍ، وإن خالها تخفى على الناسِ تُعلَمِ.", author:"زهير بن أبي سُلمى", cat:"حكمة", topics:["الأخلاق","النفس","الحقيقة"] },
    { id:"q42", text:"رأيتُ المنايا خبطَ عشواءَ من تُصِبْ، تُمِتْه، ومن تُخطئْ يُعمَّرْ فيهرَمِ.", author:"زهير بن أبي سُلمى", cat:"حياة", topics:["الموت","القدر","الحياة"] },
    { id:"q43", text:"ومن يجعلِ المعروفَ في غيرِ أهلِه، يكنْ حمدُه ذمّاً عليه ويندَمِ.", author:"زهير بن أبي سُلمى", cat:"حكمة", topics:["المعروف","الحكمة","الندم"] },
    { id:"q44", text:"وأعلمُ ما في اليومِ والأمسِ قبلَه، ولكنّني عن علمِ ما في غدٍ عَمِ.", author:"زهير بن أبي سُلمى", cat:"حكمة", topics:["الزمن","الغيب","المعرفة"] },
    { id:"q45", text:"لا يمنعنَّك من بغاءِ الخيرِ تعقيدُ العَزائمِ.", author:"أكثم بن صيفي", cat:"حكمة", topics:["العزيمة","الخير","الإقدام"] },
    { id:"q46", text:"إذا لم تستطعْ شيئاً فدعْه، وجاوزْه إلى ما تستطيعُ.", author:"عمرو بن معدي كرب", cat:"حكمة", topics:["الحكمة","الواقعية","النفس"] },
    { id:"q47", text:"وكائنْ ترى من صامتٍ لك مُعجِبٍ، زيادتُه أو نقصُه في التكلّمِ.", author:"لبيد بن ربيعة", cat:"أدب", topics:["الكلام","الحكمة","النفس"] },
    { id:"q48", text:"وما المرءُ إلا كالشهابِ وضوئِه، يحورُ رماداً بعد إذ هو ساطعُ.", author:"لبيد بن ربيعة", cat:"حياة", topics:["الحياة","الفناء","الزمن"] },
    { id:"q49", text:"ستُبدي لك الأيامُ ما كنتَ جاهلاً، ويأتيك بالأخبارِ من لم تُزوِّدِ.", author:"طرفة بن العبد", cat:"حكمة", topics:["الزمن","التجربة","المعرفة"] },
    { id:"q50", text:"وظلمُ ذوي القربى أشدُّ مضاضةً، على المرءِ من وقعِ الحسامِ المهنّدِ.", author:"طرفة بن العبد", cat:"حياة", topics:["الظلم","القرابة","الألم"] },
    { id:"q51", text:"إذا المرءُ لم يدنسْ من اللؤمِ عرضُه، فكلُّ رداءٍ يرتديه جميلُ.", author:"السموأل", cat:"حكمة", topics:["الكرامة","الأخلاق","النفس"] },
    { id:"q52", text:"وما وُجِدَ الإحسانُ إلا لأهلِه، ولا الجودُ إلا للكريمِ المُمجَّدِ.", author:"حاتم الطائي", cat:"حكمة", topics:["الكرم","الإحسان","الأخلاق"] },
    { id:"q53", text:"لا خيرَ في حِلمٍ إذا لم تكنْ له بوادرُ تحمي صفوَه أن يُكدَّرا.", author:"النابغة الذبياني", cat:"حكمة", topics:["الحلم","القوة","النفس"] },
    { id:"q54", text:"وليس الذئبُ يأكلُ لحمَ ذئبٍ، ويأكلُ بعضَنا بعضاً عِيانا.", author:"الفرزدق", cat:"حياة", topics:["الناس","الظلم","الحياة"] },
    { id:"q55", text:"إنّ الذي سمكَ السماءَ بنى لنا بيتاً دعائمُه أعزُّ وأطولُ.", author:"الفرزدق", cat:"أدب", topics:["الفخر","العزّة","الأدب"] },
  ];

  /* سِيَر موجزة — راجعها وعدّلها كما تشاء */
  const authors = {
    "المتنبي":{ era:"شاعر عربي · 915–965م", bio:"أبو الطيب المتنبي، أعظم شعراء العربية وأكثرهم حكمةً وفخراً. وُلد في الكوفة، وتنقّل بين بلاطات الأمراء، ولازم سيف الدولة الحمداني في حلب. اشتهر بحكمته العميقة وعزّة نفسه، وقُتل قرب بغداد. شعره مدرسة في الاعتزاز والفلسفة والحكمة." },
    "الإمام الشافعي":{ era:"فقيه وشاعر · 767–820م", bio:"محمد بن إدريس الشافعي، مؤسّس المذهب الشافعي وأحد أعظم فقهاء الإسلام. جمع بين الفقه والأدب، وله ديوان شعر مليء بالحكمة والمواعظ في طلب العلم والصبر ومكارم الأخلاق." },
    "علي بن أبي طالب":{ era:"خليفة وإمام · 601–661م", bio:"رابع الخلفاء الراشدين وابن عمّ النبي، اشتهر بالبلاغة والحكمة. تُنسب إليه أقوال وخطب جُمع كثير منها في «نهج البلاغة»، وتُعدّ من أرفع نصوص الحكمة في التراث العربي." },
    "جبران خليل جبران":{ era:"أديب ورسّام · 1883–1931م", bio:"أديب وفيلسوف ورسّام لبناني أمريكي، من روّاد المهجر. كتب بالعربية والإنجليزية، وأشهر أعماله «النبي». يمتاز أسلوبه بالتأمّل الروحي والصور الشعرية العميقة عن الحب والحرية والوجود." },
    "سقراط":{ era:"فيلسوف يوناني · 470–399 ق.م", bio:"أبو الفلسفة الغربية، عاش في أثينا ولم يكتب شيئاً، وعرفناه عبر تلميذه أفلاطون. اشتهر بمنهج السؤال والحوار سعياً للحقيقة ومعرفة النفس. حُكم عليه بالإعدام بتهمة إفساد الشباب، فشرب السمّ ثابتاً على مبادئه." },
    "أرسطو":{ era:"فيلسوف يوناني · 384–322 ق.م", bio:"تلميذ أفلاطون ومعلّم الإسكندر الأكبر، ومؤسّس المنطق والعلوم الطبيعية. أثّر فكره في الحضارة الإسلامية والأوروبية قروناً، حتى لُقّب عند العرب بـ«المعلّم الأول»." },
    "أفلاطون":{ era:"فيلسوف يوناني · 428–348 ق.م", bio:"تلميذ سقراط ومعلّم أرسطو، أسّس «الأكاديمية» في أثينا. صاغ فلسفته في محاورات خالدة، وطرح نظرية «المُثُل» ومدينته الفاضلة في كتاب «الجمهورية»." },
    "نيتشه":{ era:"فيلسوف ألماني · 1844–1900م", bio:"فريدريك نيتشه، من أعمق فلاسفة القرن التاسع عشر وأكثرهم إثارةً للجدل. تناول الأخلاق والقيم وإرادة القوة و«الإنسان الأعلى». أثّر أسلوبه الشعري وأفكاره في الفلسفة والأدب الحديثين." },
    "ديكارت":{ era:"فيلسوف فرنسي · 1596–1650م", bio:"رينيه ديكارت، أبو الفلسفة الحديثة وعالم رياضيات. بدأ بالشكّ في كل شيء ليصل إلى يقين «أنا أفكّر، إذاً أنا موجود». وضع أسس المنهج العقلي والهندسة التحليلية." },
    "ابن رشد":{ era:"فيلسوف أندلسي · 1126–1198م", bio:"أبو الوليد ابن رشد، فيلسوف وطبيب وقاضٍ من قرطبة. اشتهر بشروحه لأرسطو التي نقلت الفلسفة إلى أوروبا، ودافع عن التوفيق بين الحكمة والشريعة. يُعدّ من أعظم عقول الأندلس." },
    "قيس بن الملوّح":{ era:"شاعر عربي · توفي نحو 688م", bio:"المعروف بـ«مجنون ليلى»، شاعر عذريّ من بني عامر. اشتهر بحبّه العفيف لليلى الذي مُنع من الزواج بها، فهام في البادية ينظم أرقّ أشعار الحبّ في التراث العربي." },
    "أبو تمّام":{ era:"شاعر عباسي · 803–845م", bio:"حبيب بن أوس الطائي، من كبار شعراء العصر العباسي وصاحب «الحماسة». اشتهر بحكمته وبديعه وقوّة معانيه." },
    "زهير بن أبي سُلمى":{ era:"شاعر جاهلي · نحو 520–609م", bio:"من أصحاب المعلّقات ومن حكماء شعراء الجاهلية. تميّز شعره بالحكمة ومكارم الأخلاق ومدح السلام." },
    "طرفة بن العبد":{ era:"شاعر جاهلي · نحو 543–569م", bio:"من أصحاب المعلّقات، عاش قصيراً ومات شابّاً. اشتهرت معلّقته بحكمها العميقة رغم صغر سنّه." },
    "أبو العلاء المعرّي":{ era:"شاعر وفيلسوف · 973–1057م", bio:"فيلسوف الشعراء وشاعر الفلاسفة، وُلد في معرّة النعمان وفقد بصره صغيراً. اشتهر بعمق فكره وتشاؤمه الفلسفي في «اللزوميات»." },
    "سينيكا":{ era:"فيلسوف روماني · 4 ق.م–65م", bio:"لوكيوس سينيكا، فيلسوف رواقي وكاتب ومستشار، من أبرز حكماء روما. كتب في الأخلاق وقِصَر الحياة والتعامل مع القدر." },
    "ماركوس أوريليوس":{ era:"إمبراطور وفيلسوف · 121–180م", bio:"إمبراطور روماني وفيلسوف رواقي، عُرف بـ«الإمبراطور الفيلسوف». دوّن تأمّلاته في كتاب «التأمّلات» الذي صار من كلاسيكيات الحكمة." },
    "إبكتيتوس":{ era:"فيلسوف رواقي · 50–135م", bio:"فيلسوف يوناني وُلد عبداً ثم تحرّر. من أعمدة الرواقية، علّم أن الحرية الحقيقية في ضبط ما نملكه: أفكارنا وردود أفعالنا." },
    "هيراقليطس":{ era:"فيلسوف يوناني · نحو 535–475 ق.م", bio:"فيلسوف ما قبل سقراط، اشتهر بفكرة التغيّر الدائم: «كل شيء يجري». من أعمق فلاسفة الوجود والصيرورة." },
    "كونفوشيوس":{ era:"حكيم صيني · 551–479 ق.م", bio:"أعظم حكماء الصين ومعلّمها الأول. تدور فلسفته حول الأخلاق والعلاقات الاجتماعية والفضيلة، وأثّرت في الحضارة الصينية آلاف السنين." },
    "لاو تزو":{ era:"فيلسوف صيني · القرن السادس ق.م", bio:"مؤسّس الطاوية وصاحب كتاب «التاو تي تشينغ». تدعو فلسفته إلى الانسجام مع طبيعة الأشياء والبساطة والتأمّل." },
  };

  /* ═══ القصة والسياق لكل اقتباس — راجعها وصحّحها كما تشاء ═══ */
  const context = {
    "q1":"من أشهر أبيات المتنبي، ومطلعُ قصيدةٍ في مدح سيف الدولة الحمداني أمير حلب. يقرّر المتنبي قانوناً في الحياة: أن الأعمال تأتي بقدر همّة أصحابها؛ فأصحاب العزائم الكبيرة تأتيهم عزائمُ كبيرة، وأصحاب النفوس الكريمة تصدر عنهم المكارم. البيت تلخيصٌ لفلسفة المتنبي في الطموح وعلوّ الهمّة، وقد صار مثلاً يُضرب في الحثّ على الجدّ.",
    "q2":"بيتٌ يفخر فيه المتنبي بنفسه، فيجمع بين صفتَي الفروسية والأدب. فالخيلُ والليلُ والصحراء تشهد له بالشجاعة والإقدام في الحرب، والسيفُ والرمح كذلك؛ بينما القرطاسُ (الورق) والقلم يشهدان له بالبراعة في الشعر والكتابة. أراد أن يقول: أنا فارسٌ وشاعرٌ معاً، معروفٌ في ميدان القتال كما في ميدان الكلمة.",
    "q3":"تأمّلٌ عميق في عبء الوعي. يرى المتنبي أن صاحب العقل الرشيد قد يشقى حتى في النعيم، لأن عقله يُبصر العواقب والنقائص فلا يهنأ؛ بينما الجاهل قد ينعم حتى في الشقاء لأنه لا يدرك سوء حاله. بيتٌ فلسفيّ يوازن بين راحة الغفلة ومعاناة الإدراك.",
    "q4":"يعبّر المتنبي عن العلاقة بين علوّ الهمّة وتعب الجسد. فالنفوس الكبيرة الطموحة تُرهق أجسادها في السعي وراء غاياتها العظيمة، لأن الطموح لا يعرف الراحة. البيت وثيقُ الصلة بفلسفته في العزم التي عبّر عنها في «على قدر أهل العزم».",
    "q5":"من ديوان الإمام الشافعي، فقيهِ الإسلام وشاعره. يقرّر مبدأً في طلب العلم والمجد: أن المعالي لا تُنال إلا بقدر الجهد والتعب، وأن من أراد المراتب العليا فعليه أن يسهر ويكدح. بيتٌ صار شعاراً لطلاب العلم عبر القرون.",
    "q6":"حكمةٌ تُنسب إلى الإمام علي بن أبي طالب. معناها أن قيمة الإنسان الحقيقية ليست في نسبه أو ماله، بل في ما يُتقنه ويُحسن عمله. فالمرء يُقاس بإنجازه وإتقانه لا بمظهره. من أجمع كلمات الحكمة في تقدير الإنسان.",
    "q7":"من الأقوال المأثورة التي تُنسب إلى الإمام علي، وأحبّها المتصوّفة. تصوّر الحياة الدنيا كحال نومٍ وغفلة، والموت كلحظة يقظةٍ تنكشف فيها الحقائق. دعوةٌ إلى الانتباه والتأمّل في معنى الوجود قبل فوات الأوان.",
    "q8":"من حِكَم جبران خليل جبران في كتابه «رمل وزبد». يقول إن الحقيقة لا تكفيها كلمةٌ تُقال، بل تحتاج إلى طرفين: قائلٍ يملك الشجاعة للنطق بها، وسامعٍ يملك البصيرة لفهمها. تأمّلٌ في أن المعرفة فعلٌ مشترك بين المُرسِل والمتلقّي.",
    "q9":"من أشهر أقوال جبران عن الحبّ في «رمل وزبد». يحذّر من أن الحبّ كائنٌ حيّ يحتاج تجديداً يومياً؛ فإن أهمله صاحبه تحوّل إلى عادةٍ باردة، ثم إلى قيدٍ ثقيل. دعوةٌ لإبقاء الحبّ حيّاً بالاهتمام المتجدّد.",
    "q10":"قالها سقراط في محاكمته بأثينا، كما نقلها تلميذه أفلاطون في «الدفاع». حين خُيّر بين التخلّي عن الفلسفة أو الموت، رفض حياةً بلا تفكيرٍ وتأمّل، معلناً أن الحياة التي لا يفحص فيها الإنسان نفسه ومبادئه لا تستحقّ أن تُعاش. ثم اختار الموت ثابتاً على قناعته.",
    "q11":"تُنسب إلى أرسطو، ونقلها المؤرّخ ديوجينس اللائرتي. تعبيرٌ بديع عن الصداقة الحقّة: أن يبلغ الصديقان من التوافق حدّاً تصير معه روحاهما روحاً واحدة تسكن جسدين. من أجمل ما قيل في المحبّة الخالصة.",
    "q12":"مثلٌ فلسفيّ قديم يُنسب إلى أفلاطون (ويرِد معناه في «الجمهورية»)، وإن اختُلف في نسبته الحرفية. معناه أن الاختراعات والحلول تولد من رحم الحاجة؛ فحين يضطرّ الإنسان، يبدع. تلخيصٌ لدافع التقدّم البشري. (النسبة الدقيقة محلّ نقاش، فراجعها.)",
    "q13":"من كتاب نيتشه «أفول الأصنام». يقرّر أن امتلاك معنىً وغايةٍ للحياة يمنح الإنسان قدرةً على تحمّل أقسى الظروف؛ فمن عرف «لماذا» يعيش، هان عليه «كيف» يعيش. اشتهرت هذه الفكرة لاحقاً حين بنى عليها الطبيب فيكتور فرانكل تجربته في معسكرات الاعتقال.",
    "q14":"العبارة المؤسّسة للفلسفة الحديثة، صاغها ديكارت في «مقال عن المنهج». بعد أن شكّ في كل شيء بحثاً عن يقين، أدرك أن شكّه نفسه دليلٌ على وجوده كذاتٍ مفكّرة: ما دمتُ أفكّر، فأنا موجودٌ حتماً. صارت نقطة الانطلاق للعقلانية الحديثة.",
    "q15":"سلسلةٌ سببية تُنسب شهرتها إلى ابن رشد الفيلسوف الأندلسي: الجهل يورث الخوف من المجهول، والخوف يورث كراهية ما نجهله، والكراهية تقود إلى العنف. علاجها في أوّلها: المعرفة. (ملاحظة: نسبة هذه الصياغة الحرفية إلى ابن رشد شائعة لكنها غير موثّقة بدقّة، فاعتبرها منسوبةً إليه.)",
    "q16":"من روائع الشعر العذريّ لقيس بن الملوّح «مجنون ليلى». يصوّر عشقه العفيف: يمرّ على منازل ليلى فيُقبّل جدرانها، ثم يوضّح أن حبّه ليس للجدران في ذاتها، بل لمن سكنت تلك الديار. من أصدق تعابير الحنين والوفاء في الشعر العربي.",
  };

  const catColors={ "حكمة":"var(--c-hikma)","فلسفة":"var(--c-falsafa)","أدب":"var(--c-adab)","حب":"var(--c-hob)","حياة":"var(--c-hayat)" };
  let extraQuotes=[]; // اقتباسات الأعضاء المعتمدة (من قاعدة البيانات)
  let libQuotes=[];   // اقتباسات المكتبة المنشورة (lib_quotes)
  function allQuotes(){ return libQuotes.concat(extraQuotes).concat(quotes); }
  const catHex={ "حكمة":"#275c86","فلسفة":"#6a4a73","أدب":"#b08842","حب":"#a85d57","حياة":"#5e7a5a" };
  const PATTERN="data:image/svg+xml,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><g fill='none' stroke='#ffffff' stroke-opacity='0.18' stroke-width='1.3'><rect x='16' y='16' width='32' height='32'/><rect x='16' y='16' width='32' height='32' transform='rotate(45 32 32)'/><circle cx='32' cy='32' r='3'/></g></svg>");

  function norm(s){ return s.replace(/[\u064B-\u0652\u0670\u0640]/g,"").replace(/[أإآ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").trim(); }
  function esc(s){ return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m])); }

  const grid=document.getElementById("grid"), filters=document.getElementById("filters"), countEl=document.getElementById("count"),
        searchI=document.getElementById("search"), toast=document.getElementById("toast");
  let activeCat="الكل", term="", likeCounts={}, likedByMe={}, activeTopic="";
  let currentUser=null, currentName="", authMode="login";
  let commentLikeCount={}, commentLikedByMe={};
  const ADMIN_ID="1a8e242d-5f21-4122-82f5-6a4fa50afdbb";
  function isAdmin(){ return !!(currentUser && currentUser.id===ADMIN_ID); }

  function showToast(m){ toast.textContent=m; toast.classList.add("show"); setTimeout(()=>toast.classList.remove("show"),1800); }
  function headBg(q){ const hex=catHex[q.cat]||"#275c86";
    if(q.img) return "background-color:"+hex+";background-image:linear-gradient(rgba(15,11,6,.55),rgba(15,11,6,.82)),url('"+q.img+"');";
    return "background-color:"+hex+";background-image:linear-gradient(rgba(15,11,6,.35),rgba(15,11,6,.62)),url(\""+PATTERN+"\");"; }

  /* اقتباس اليوم — يتغيّر يومياً بحسب رقم اليوم */
  function renderDaily(){
    const day=Math.floor(Date.now()/86400000);
    const q=quotes[day%quotes.length];
    const el=document.getElementById("daily");
    el.setAttribute("style", headBg(q));
    el.innerHTML=`<span class="eyebrow">اقتباس اليوم</span>
      <div class="dtext">${esc(q.text)}</div>
      <div class="dauthor" onclick="openAuthor('${esc(q.author)}')">${esc(q.author)}</div>`;
  }

  const cats=["الكل",...Object.keys(catColors)];
  cats.forEach(c=>{ const b=document.createElement("button"); b.className="chip"+(c==="الكل"?" active":""); b.textContent=c;
    b.addEventListener("click",()=>{ activeCat=c; document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active")); b.classList.add("active"); resetPage(); render(); });
    filters.appendChild(b); });

  /* بناء أزرار الموضوعات (وسوم فريدة من كل الاقتباسات) */
  const allTopics=[...new Set(quotes.flatMap(q=>q.topics||[]))].sort();
  const tf=document.getElementById("topicFilters");
  const tlabel=document.createElement("span"); tlabel.className="topics-label"; tlabel.textContent="تصفية بالموضوع"; tf.appendChild(tlabel);
  allTopics.forEach(t=>{ const b=document.createElement("button"); b.className="tchip"; b.textContent=t;
    b.addEventListener("click",()=>{
      if(activeTopic===t){ activeTopic=""; b.classList.remove("active"); }
      else{ activeTopic=t; document.querySelectorAll(".tchip").forEach(x=>x.classList.remove("active")); b.classList.add("active"); }
      resetPage(); render();
    });
    tf.appendChild(b); });

  function card(q,i){
    const likes=likeCounts[q.id]||0, liked=likedByMe[q.id]?" liked":"", shareUrl=encodeURIComponent(location.href);
    const shareTextEnc=encodeURIComponent(`"${q.text}" — ${q.author}`);
    const shareTextUrl=encodeURIComponent(`"${q.text}" — ${q.author}\n${location.href}`);
    const delay=Math.min((i||0)*45,450);
    const avatar = q.img
      ? `<span class="pavatar" style="background-image:url('${q.img}')" onclick="openAuthor('${esc(q.author)}')"></span>`
      : `<span class="pavatar pavatar-mono" style="background:${catHex[q.cat]||'#3f6ea5'}" onclick="openAuthor('${esc(q.author)}')">${esc((q.author||'?').trim().charAt(0))}</span>`;
    return `<article class="qcard post" id="card-${q.id}" style="animation-delay:${delay}ms">
      <div class="post-head">
        ${avatar}
        <div class="post-id">
          <span class="post-author" onclick="openAuthor('${esc(q.author)}')">${esc(q.author)}</span>
          <span class="post-cat"><span class="dot" style="background:${catHex[q.cat]||'#3f6ea5'}"></span>${q.cat}${q.community?' · مساهمة مجتمع':''}</span>
        </div>
      </div>
      <p class="post-text">${esc(q.text)}</p>
      <div class="qtopics">${(q.topics||[]).slice(0,3).map(t=>`<span class="qtag" onclick="filterTopic('${esc(t)}')">#${esc(t)}</span>`).join("")}</div>
      <div class="actions post-actions">
        <button class="act${liked}" onclick="toggleLike('${q.id}')" aria-label="إعجاب"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9.3C.4 8 2 4.5 5.2 4.5c2 0 3.3 1.2 4.1 2.4C10.5 5.7 11.8 4.5 13.8 4.5 17 4.5 18.6 8 17 11.7 14.5 16.4 12 21 12 21z"/></svg><span id="lc-${q.id}">${likes}</span></button>
        <button class="act" onclick="toggleComments('${q.id}')">💬 <span id="cc-${q.id}">تعليق</span></button>
        <div class="share-wrap">
          <button class="act" onclick="toggleShare(event,'${q.id}')">🔗</button>
          <div class="share-menu" id="sh-${q.id}">
            <a href="https://wa.me/?text=${shareTextUrl}" target="_blank" rel="noopener">واتساب</a>
            <a href="https://twitter.com/intent/tweet?text=${shareTextUrl}" target="_blank" rel="noopener">تويتر / X</a>
            <a href="https://t.me/share/url?url=${shareUrl}&text=${shareTextEnc}" target="_blank" rel="noopener">تيليغرام</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" rel="noopener">فيسبوك</a>
          </div>
        </div>
        <button class="act" onclick="copyQuote('${q.id}')">📋</button>
        <button class="act" onclick="downloadCard('${q.id}')">🖼️</button>
        ${context[q.id]?`<button class="act ctx" onclick="openContext('${q.id}')">📖 القصة</button>`:""}
      </div>
      <div class="cpreview" id="cp-${q.id}"></div>
      <div class="comments" id="cm-${q.id}">
        <div class="clist" id="cl-${q.id}"><div class="cempty">جارِ التحميل…</div></div>
        <div class="cform-wrap" id="cw-${q.id}"></div>
      </div>
    </article>`;
  }

  const PAGE=12; let shown=PAGE;
  function render(){
    const t=norm(term);
    const list=allQuotes().filter(q=>{ const mc=activeCat==="الكل"||q.cat===activeCat; const mt=!t||norm(q.text).includes(t)||norm(q.author).includes(t)||(q.topics||[]).some(tp=>norm(tp).includes(t)); const mtopic=!activeTopic||(q.topics||[]).includes(activeTopic); return mc&&mt&&mtopic; });
    const btnBox=document.getElementById("loadMoreBox");
    if(!list.length){ grid.innerHTML='<p class="empty">لا توجد اقتباساتٌ مطابقة… جرّب كلمةً أخرى.</p>'; countEl.textContent=""; if(btnBox) btnBox.innerHTML=""; return; }
    const slice=list.slice(0,shown);
    grid.innerHTML=slice.map((q,i)=>card(q,i)).join("");
    loadPreviews(slice.map(q=>q.id));
    countEl.textContent="عرض "+slice.length+" من "+list.length+" اقتباس";
    if(btnBox){ btnBox.innerHTML = list.length>shown ? '<button class="discover-btn" onclick="loadMore()">تحميل المزيد ↓</button>' : ""; }
  }
  function loadMore(){ shown+=PAGE; render(); }
  function resetPage(){ shown=PAGE; }
  searchI.addEventListener("input",e=>{ term=e.target.value; resetPage(); render(); });

  /* نافذة الكاتب */
  function openAuthor(name){
    const a=authors[name]; const modal=document.getElementById("authorModal");
    document.getElementById("mName").textContent=name;
    document.getElementById("mEra").textContent=a?a.era:"";
    document.getElementById("mBio").textContent=a?a.bio:"لا تتوفّر سيرة بعد.";
    document.getElementById("mBooks").innerHTML="";
    updateBooksButton(name);
    const his=allQuotes().filter(q=>q.author===name);
    document.getElementById("mQuotes").innerHTML=his.map(q=>`<div class="modal-q">${esc(q.text)}</div>`).join("");
    modal.classList.add("open");
  }
  function closeAuthor(){ document.getElementById("authorModal").classList.remove("open"); }
  document.getElementById("authorModal").addEventListener("click",e=>{ if(e.target.id==="authorModal") closeAuthor(); });
  document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeAuthor(); });

  function anonLiked(){ try{ return JSON.parse(localStorage.getItem("anonLiked")||"{}"); }catch(e){ return {}; } }
  function setAnonLiked(o){ try{ localStorage.setItem("anonLiked",JSON.stringify(o)); }catch(e){} }
  async function loadLikes(){
    likeCounts={}; likedByMe={};
    try{
      const {data}=await db.from("user_likes").select("quote_id,user_id");
      (data||[]).forEach(r=>{ likeCounts[r.quote_id]=(likeCounts[r.quote_id]||0)+1; if(currentUser&&r.user_id===currentUser.id) likedByMe[r.quote_id]=true; });
    }catch(e){ console.warn("likes:",e); }
    // إعجابات الزوّار (عدّاد)
    try{
      const {data}=await db.from("anon_likes").select("quote_id,count");
      (data||[]).forEach(r=>{ likeCounts[r.quote_id]=(likeCounts[r.quote_id]||0)+(r.count||0); });
    }catch(e){ console.warn("anonlikes:",e); }
    if(!currentUser){ const al=anonLiked(); Object.keys(al).forEach(k=>{ if(al[k]) likedByMe[k]=true; }); }
  }
  async function toggleLike(id){
    if(currentUser){
      const already=likedByMe[id];
      try{
        if(already){ await db.from("user_likes").delete().eq("user_id",currentUser.id).eq("quote_id",id); likedByMe[id]=false; likeCounts[id]=Math.max(0,(likeCounts[id]||1)-1); }
        else { await db.from("user_likes").insert({user_id:currentUser.id,quote_id:id}); likedByMe[id]=true; likeCounts[id]=(likeCounts[id]||0)+1; }
        const el=document.getElementById("lc-"+id); if(el) el.textContent=likeCounts[id];
        const btn=el&&el.closest(".act"); if(btn) btn.classList.toggle("liked",likedByMe[id]);
      }catch(e){ console.warn("like:",e); showToast("تعذّر الحفظ"); }
      return;
    }
    // زائر غير مسجّل: إعجاب واحد لكل متصفّح (لا إلغاء)
    const al=anonLiked();
    if(al[id]){ showToast("أعجبك هذا مسبقاً"); return; }
    try{
      const cur=(likeCounts[id]||0);
      const {error}=await db.from("anon_likes").upsert({quote_id:id,count:cur+1},{onConflict:"quote_id"});
      if(error) throw error;
      al[id]=true; setAnonLiked(al); likedByMe[id]=true; likeCounts[id]=cur+1;
      const el=document.getElementById("lc-"+id); if(el) el.textContent=likeCounts[id];
      const btn=el&&el.closest(".act"); if(btn) btn.classList.add("liked");
    }catch(e){ console.warn("anonlike:",e); showToast("تعذّر الحفظ"); }
  }
  async function toggleComments(id){ const box=document.getElementById("cm-"+id); box.classList.toggle("open");
    const prev=document.getElementById("cp-"+id);
    if(box.classList.contains("open")){ if(prev) prev.style.display="none"; renderCommentForm(id); loadComments(id); }
    else { if(prev) prev.style.display=""; } }

  function renderCommentForm(id){
    const w=document.getElementById("cw-"+id); if(!w) return;
    if(currentUser){
      w.innerHTML=`<div class="cform">
        <textarea id="cb-${id}" rows="2" placeholder="اكتب تعليقك باسم ${esc(currentName)}…" maxlength="300"></textarea>
        <button onclick="addComment('${id}')">أضف تعليقاً</button></div>`;
    } else {
      w.innerHTML=`<div class="cform">
        <input id="cn-${id}" type="text" placeholder="اسمك (اختياري)" maxlength="40">
        <textarea id="cb-${id}" rows="2" placeholder="اكتب تعليقك… (أو سجّل الدخول لاسمٍ ثابت)" maxlength="300"></textarea>
        <button onclick="addComment('${id}')">أضف تعليقاً</button>
        <div class="comment-gate" style="margin-top:.3rem"><a onclick="openAuth()">سجّل الدخول</a> لاسمٍ ثابت ومزايا الأعضاء</div></div>`;
    }
  }
  /* معاينة أوّل تعليق تلقائياً (استعلام واحد لكل البطاقات الظاهرة) */
  async function loadPreviews(ids){
    if(!ids||!ids.length) return;
    try{
      const {data,error}=await db.from("comments").select("name,body,quote_id,parent_id,created_at").in("quote_id",ids).order("created_at",{ascending:true});
      if(error) throw error;
      const byQuote={};
      (data||[]).forEach(r=>{ (byQuote[r.quote_id]=byQuote[r.quote_id]||[]).push(r); });
      ids.forEach(id=>{
        const box=document.getElementById("cp-"+id); if(!box) return;
        const rows=byQuote[id]||[]; const total=rows.length;
        const cc=document.getElementById("cc-"+id); if(cc) cc.textContent = total? total+" تعليق" : "تعليق";
        if(!total){ box.innerHTML=`<div class="cprev-empty" onclick="toggleComments('${id}')">لا تعليقات بعد — كن أوّل من يعلّق</div>`; return; }
        const first=rows[0];
        let html=`<div class="cprev-item"><span class="cname">${esc(first.name||"زائر")}</span> ${esc(first.body)}</div>`;
        if(total>1){ html+=`<span class="cprev-more" onclick="toggleComments('${id}')">عرض كل التعليقات (${total}) ↓</span>`; }
        else { html+=`<span class="cprev-more" onclick="toggleComments('${id}')">أضف تعليقاً ↓</span>`; }
        box.innerHTML=html;
      });
    }catch(e){ console.warn("previews:",e); }
  }

  async function loadComments(id){ const list=document.getElementById("cl-"+id);
    try{
      const {data,error}=await db.from("comments").select("id,name,body,created_at,parent_id,user_id").eq("quote_id",id).order("created_at",{ascending:true});
      if(error) throw error;
      const rows=data||[];
      commentLikeCount={}; commentLikedByMe={};
      const ids=rows.map(r=>r.id);
      if(ids.length){
        try{ const {data:cl}=await db.from("comment_likes").select("comment_id,user_id").in("comment_id",ids);
          (cl||[]).forEach(r=>{ commentLikeCount[r.comment_id]=(commentLikeCount[r.comment_id]||0)+1; if(currentUser&&r.user_id===currentUser.id) commentLikedByMe[r.comment_id]=true; }); }
        catch(e){ console.warn("clikes:",e); }
      }
      renderComments(id,rows);
    }catch(e){ console.warn("comments:",e); list.innerHTML='<div class="cempty">تعذّر تحميل التعليقات</div>'; }
  }
  function commentNode(qid,c,childrenHtml){
    const likes=commentLikeCount[c.id]||0, liked=commentLikedByMe[c.id]?" liked":"";
    const mine=currentUser&&c.user_id===currentUser.id;
    const admin=isAdmin();
    let ctrl="";
    if(mine){ ctrl+=`<button class="cact" onclick="showEditForm(${c.id})">✎ تعديل</button>`; }
    if(mine||admin){ ctrl+=`<button class="cact cdel" onclick="deleteComment(${c.id},'${qid}')">🗑 حذف${admin&&!mine?" (إشراف)":""}</button>`; }
    if(currentUser&&!mine){ ctrl+=`<button class="cact" onclick="reportComment(${c.id})">🚩 إبلاغ</button>`; }
    return `<div class="citem">
      <div class="cname">${esc(c.name||"زائر")}</div>
      <div class="cbody" id="cbody-${c.id}">${esc(c.body)}</div>
      <div class="edit-form" id="ef-${c.id}" data-raw="${esc(c.body)}"></div>
      <div class="cactions">
        <button class="cact${liked}" onclick="toggleCommentLike(${c.id},'${qid}')">♥ <span>${likes}</span></button>
        <button class="cact" onclick="showReplyForm('${qid}',${c.id})">↩ ردّ</button>${ctrl}
      </div>
      <div class="reply-form" id="rf-${c.id}"></div>
      <div class="creplies">${childrenHtml}</div>
    </div>`;
  }
  function showEditForm(commentId){
    const box=document.getElementById("ef-"+commentId); if(!box) return;
    const bodyEl=document.getElementById("cbody-"+commentId);
    if(box.dataset.open==="1"){ box.innerHTML=""; box.dataset.open=""; bodyEl.style.display=""; return; }
    box.dataset.open="1"; bodyEl.style.display="none";
    const raw=box.getAttribute("data-raw")||"";
    box.innerHTML=`<div class="cform">
      <textarea id="eb-${commentId}" rows="2" maxlength="300">${raw}</textarea>
      <div style="display:flex;gap:.4rem">
        <button onclick="saveEdit(${commentId})">حفظ</button>
        <button style="background:var(--muted)" onclick="showEditForm(${commentId})">إلغاء</button>
      </div></div>`;
  }
  async function saveEdit(commentId){
    const el=document.getElementById("eb-"+commentId); const body=(el.value||"").trim();
    if(!body){ showToast("لا يمكن ترك التعليق فارغاً"); return; }
    try{
      const {error}=await db.from("comments").update({body}).eq("id",commentId).eq("user_id",currentUser.id);
      if(error) throw error;
      const qid=findQuoteOfOpenComments(); showToast("تمّ التعديل ✔");
      if(qid) loadComments(qid);
    }catch(e){ console.warn("edit:",e); showToast("تعذّر التعديل"); }
  }
  async function deleteComment(commentId,qid){
    if(!confirm("هل تريد حذف هذا التعليق؟ سيُحذف مع ردوده.")) return;
    try{
      let q=db.from("comments").delete().eq("id",commentId);
      if(!isAdmin()) q=q.eq("user_id",currentUser.id);  // العضو العادي: تعليقه فقط
      const {error}=await q;
      if(error) throw error;
      showToast("حُذف التعليق 🗑"); loadComments(qid);
    }catch(e){ console.warn("delete:",e); showToast("تعذّر الحذف"); }
  }
  function findQuoteOfOpenComments(){ const open=document.querySelector(".comments.open"); return open?open.id.replace("cm-",""):null; }
  async function reportComment(commentId){
    if(!currentUser){ showToast("سجّل الدخول للإبلاغ"); openAuth(); return; }
    const reason=prompt("سبب الإبلاغ (اختياري): إساءة، سبام، محتوى غير لائق…");
    if(reason===null) return; // ألغى المستخدم
    try{
      const {error}=await db.from("reports").insert({comment_id:commentId,reporter_id:currentUser.id,reason:reason||null});
      if(error) throw error;
      showToast("شكراً، وصل بلاغك للمشرف 🚩");
    }catch(e){ console.warn("report:",e); showToast("تعذّر إرسال البلاغ"); }
  }
  function renderComments(id,rows){ const list=document.getElementById("cl-"+id);
    if(!rows.length){ list.innerHTML='<div class="cempty">لا توجد تعليقات بعد — كن أوّل من يعلّق</div>'; const cc0=document.getElementById("cc-"+id); if(cc0) cc0.textContent="تعليق"; return; }
    const byParent={}; rows.forEach(r=>{ const p=r.parent_id||0; (byParent[p]=byParent[p]||[]).push(r); });
    function build(parent){ return (byParent[parent]||[]).map(c=>commentNode(id,c,build(c.id))).join(""); }
    list.innerHTML=build(0);
    const cc=document.getElementById("cc-"+id); if(cc) cc.textContent=rows.length+" تعليق";
  }
  function showReplyForm(qid,parentId){
    const box=document.getElementById("rf-"+parentId); if(!box) return;
    if(box.dataset.open==="1"){ box.innerHTML=""; box.dataset.open=""; return; }
    box.dataset.open="1";
    const nameField=currentUser?"":`<input id="rn-${parentId}" type="text" placeholder="اسمك (اختياري)" maxlength="40">`;
    const ph=currentUser?`ردّك باسم ${esc(currentName)}…`:"اكتب ردّك…";
    box.innerHTML=`<div class="cform">
      ${nameField}
      <textarea id="rb-${parentId}" rows="2" placeholder="${ph}" maxlength="300"></textarea>
      <button onclick="addReply('${qid}',${parentId})">إرسال الردّ</button></div>`;
  }
  let lastPostAt=0;
  function throttleOk(){
    const now=Date.now();
    if(now-lastPostAt < 5000){ showToast("تمهّل قليلاً بين التعليقات ⏳"); return false; }
    lastPostAt=now; return true;
  }
  function postError(e){
    const m=(e&&e.message)||"";
    if(/تجاوزت الحدّ|rate|limit/i.test(m)) showToast("تجاوزت الحدّ المسموح — انتظر دقيقة ⏳");
    else showToast("تعذّر النشر");
  }
  async function addReply(qid,parentId){
    if(!currentUser){ showToast("سجّل الدخول"); openAuth(); return; }
    const el=document.getElementById("rb-"+parentId); const body=(el.value||"").trim();
    if(!body){ showToast("اكتب ردّك أولاً"); return; }
    if(!throttleOk()) return;
    try{ const {error}=await db.from("comments").insert({name:currentName,body,quote_id:qid,user_id:currentUser.id,parent_id:parentId}); if(error) throw error; loadComments(qid); showToast("تمّ نشر ردّك ✔"); }
    catch(e){ console.warn("reply:",e); postError(e); }
  }
  async function toggleCommentLike(commentId,quoteId){
    if(!currentUser){ showToast("سجّل الدخول للإعجاب"); openAuth(); return; }
    try{
      if(commentLikedByMe[commentId]){ await db.from("comment_likes").delete().eq("user_id",currentUser.id).eq("comment_id",commentId); }
      else { await db.from("comment_likes").insert({user_id:currentUser.id,comment_id:commentId}); }
      loadComments(quoteId);
    }catch(e){ console.warn("clike:",e); showToast("تعذّر الحفظ"); }
  }
  async function addComment(id){
    const bodyEl=document.getElementById("cb-"+id); const body=(bodyEl.value||"").trim();
    if(!body){ showToast("اكتب تعليقاً أولاً"); return; }
    if(!throttleOk()) return;
    let name, uid;
    if(currentUser){ name=currentName; uid=currentUser.id; }
    else { const nEl=document.getElementById("cn-"+id); name=(nEl&&nEl.value.trim())||"زائر"; uid=null; }
    bodyEl.value="";
    try{ const {error}=await db.from("comments").insert({name,body,quote_id:id,user_id:uid,parent_id:null}); if(error) throw error; loadComments(id); showToast("تمّ نشر تعليقك ✔"); }
    catch(e){ console.warn("comment:",e); postError(e); bodyEl.value=body; }
  }
  function copyQuote(id){ const q=allQuotes().find(x=>x.id===id); if(!q) return; navigator.clipboard.writeText(`"${q.text}" — ${q.author}`).then(()=>showToast("نُسخ الاقتباس 📋")).catch(()=>showToast("تعذّر النسخ")); }

  /* ═══════════ Archive.org — كتاب مختار لكل كاتب ═══════════ */
  /* لكل كاتب: معرّف الكتاب على archive.org (details/<id>) وعنوانه.
     إن لم يعمل رابط، غيّر المعرّف من صفحة archive.org للكتاب. */
  const archiveBooks = {
    "المتنبي":            { id:"waq0110",         title:"ديوان المتنبي" },
    "الإمام الشافعي":     { id:"waq53759",        title:"ديوان الإمام الشافعي" },
    "علي بن أبي طالب":    { id:"waq0037",         title:"نهج البلاغة" },
    "جبران خليل جبران":   { id:"waq86923",        title:"النبي — جبران خليل جبران" },
    "أبو تمّام":          { id:"waq54327",        title:"ديوان أبي تمام" },
    "أبو العلاء المعرّي":  { id:"waq52548",        title:"ديوان أبي العلاء المعري (اللزوميات)" },
    "زهير بن أبي سُلمى":  { id:"waq5334",         title:"ديوان زهير بن أبي سلمى" },
    "طرفة بن العبد":      { id:"waq49985",        title:"ديوان طرفة بن العبد" },
    "قيس بن الملوّح":     { id:"waq89547",        title:"ديوان مجنون ليلى — قيس بن الملوّح" },
    "ابن رشد":            { id:"tahafutaltahafut", title:"تهافت التهافت — ابن رشد" },
    "سقراط":              { id:"platoapology",    title:"دفاع سقراط — أفلاطون" },
    "أفلاطون":            { id:"platorepublic",   title:"الجمهورية — أفلاطون" },
    "أرسطو":              { id:"aristotle_nicomachean_ethics", title:"الأخلاق النيقوماخية — أرسطو" },
    "نيتشه":              { id:"thusspokezarathustra", title:"هكذا تكلّم زرادشت — نيتشه" },
    "ديكارت":             { id:"descartesmeditations", title:"تأمّلات — ديكارت" },
    "سينيكا":             { id:"senecaletters",   title:"رسائل — سينيكا" },
    "ماركوس أوريليوس":    { id:"meditationsmarcus", title:"التأمّلات — ماركوس أوريليوس" },
    "إبكتيتوس":           { id:"epictetusdiscourses", title:"محادثات — إبكتيتوس" },
    "كونفوشيوس":          { id:"confucius_analects", title:"المحاورات — كونفوشيوس" },
    "لاو تزو":            { id:"taoteching",      title:"التاو تي تشينغ — لاو تزو" },
  };

  let currentAuthorForBooks="";
  function updateBooksButton(name){
    currentAuthorForBooks=name;
    const btn=document.getElementById("mBooksBtn");
    if(!btn) return;
    if(archiveBooks[name]){
      btn.style.display="";
      btn.textContent="📖 اقرأ: "+archiveBooks[name].title;
    } else {
      btn.style.display="none";
    }
  }
  function openArchiveBook(){
    const name=currentAuthorForBooks; const book=archiveBooks[name]; if(!book) return;
    document.getElementById("readerTitle").textContent=book.title;
    document.getElementById("archiveFrame").src="https://archive.org/embed/"+encodeURIComponent(book.id);
    document.getElementById("archiveLink").href="https://archive.org/details/"+encodeURIComponent(book.id);
    document.getElementById("readerModal").classList.add("open");
  }
  function closeReader(){ document.getElementById("readerModal").classList.remove("open"); document.getElementById("archiveFrame").src=""; }
  document.getElementById("readerModal").addEventListener("click",e=>{ if(e.target.id==="readerModal") closeReader(); });

  /* ═══════════ القصة والسياق ═══════════ */
  function openContext(id){
    const q=allQuotes().find(x=>x.id===id); if(!q) return;
    document.getElementById("ctxQuote").textContent="\u201C"+q.text+"\u201D";
    document.getElementById("ctxAuthor").textContent="— "+q.author;
    document.getElementById("ctxText").textContent=context[id]||"لا يتوفّر شرح بعد.";
    document.getElementById("contextModal").classList.add("open");
  }
  function closeContext(){ document.getElementById("contextModal").classList.remove("open"); }
  document.getElementById("contextModal").addEventListener("click",e=>{ if(e.target.id==="contextModal") closeContext(); });

  /* ═══════════ الشريط الجانبي: أعلام الحكمة (تبديل تلقائي) ═══════════ */
  let poets=[], poetIdx=0, poetTimer=null;
  function buildPoets(){
    poets=[];
    Object.keys(authors).forEach(name=>{
      const q=quotes.find(x=>x.author===name && x.img);
      poets.push({ name, era:authors[name].era||"", bio:authors[name].bio||"", img:(q&&q.img)||wm("A Library in Golden Islamic Age.jpg") });
    });
  }
  function renderPoet(i){
    const p=poets[i]; if(!p) return;
    const inner=document.getElementById("psInner"); if(!inner) return;
    inner.style.opacity="0";
    setTimeout(()=>{
      inner.style.backgroundImage="url('"+p.img+"')";
      document.getElementById("psName").textContent=p.name;
      document.getElementById("psEra").textContent=p.era;
      document.getElementById("psBio").textContent=p.bio;
      document.querySelectorAll(".ps-dot").forEach((d,di)=>d.classList.toggle("on",di===i));
      inner.style.opacity="1";
    },420);
  }
  function gotoPoet(i){ poetIdx=i; renderPoet(i); restartPoetTimer(); }
  function restartPoetTimer(){ if(poetTimer) clearInterval(poetTimer); poetTimer=setInterval(()=>{ poetIdx=(poetIdx+1)%poets.length; renderPoet(poetIdx); },7000); }
  function startPoets(){
    buildPoets(); if(!poets.length) return;
    const dots=document.getElementById("psDots");
    if(dots) dots.innerHTML=poets.map((p,i)=>`<span class="ps-dot" onclick="gotoPoet(${i})"></span>`).join("");
    poetIdx=0; renderPoet(0); restartPoetTimer();
  }

  /* ═══════════ اكتشف اقتباساً عشوائياً ═══════════ */
  function randomQuote(){
    activeCat="الكل"; activeTopic=""; term=""; searchI.value=""; resetPage();
    document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active", x.textContent==="الكل"));
    document.querySelectorAll(".tchip").forEach(x=>x.classList.remove("active"));
    render();
    const all=allQuotes(); if(!all.length) return;
    const q=all[Math.floor(Math.random()*all.length)];
    setTimeout(()=>{
      const el=document.getElementById("card-"+q.id);
      if(el){ el.scrollIntoView({behavior:"smooth",block:"center"}); el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse"); }
    },120);
  }

  /* ═══════════ قائمة المشاركة ═══════════ */
  function toggleShare(ev,id){
    ev.stopPropagation();
    const menu=document.getElementById("sh-"+id); const wasOpen=menu.classList.contains("open");
    document.querySelectorAll(".share-menu").forEach(m=>m.classList.remove("open"));
    if(!wasOpen) menu.classList.add("open");
  }
  document.addEventListener("click",()=>{ document.querySelectorAll(".share-menu.open").forEach(m=>m.classList.remove("open")); });

  /* ═══════════ بطاقة اقتباس قابلة للتنزيل كصورة ═══════════ */
  function shade(hex,amt){
    let n=parseInt(hex.slice(1),16), r=(n>>16)+amt, g=((n>>8)&255)+amt, b=(n&255)+amt;
    r=Math.max(0,Math.min(255,r)); g=Math.max(0,Math.min(255,g)); b=Math.max(0,Math.min(255,b));
    return "rgb("+r+","+g+","+b+")";
  }
  function wrapText(ctx,text,font,maxWidth){
    ctx.font=font; const words=text.split(/\s+/); const lines=[]; let line="";
    words.forEach(w=>{ const test=line?line+" "+w:w;
      if(ctx.measureText(test).width>maxWidth && line){ lines.push(line); line=w; } else line=test; });
    if(line) lines.push(line); return lines;
  }
  function drawPattern(ctx,W,H){
    ctx.save(); ctx.strokeStyle="rgba(255,255,255,0.05)"; ctx.lineWidth=2;
    for(let x=0;x<W;x+=90){ for(let y=0;y<H;y+=90){
      ctx.save(); ctx.translate(x+45,y+45);
      ctx.strokeRect(-22,-22,44,44); ctx.rotate(Math.PI/4); ctx.strokeRect(-22,-22,44,44);
      ctx.restore();
    }} ctx.restore();
  }
  async function downloadCard(id){
    const q=allQuotes().find(x=>x.id===id); if(!q) return;
    showToast("جارٍ إنشاء الصورة… 🖼️");
    try{ await document.fonts.load("700 64px Amiri"); await document.fonts.load("500 58px Amiri"); await document.fonts.load("700 44px Tajawal"); await document.fonts.ready; }catch(e){}
    const W=1080,H=1350, hex=catHex[q.cat]||"#275c86";
    const canvas=document.createElement("canvas"); canvas.width=W; canvas.height=H;
    const ctx=canvas.getContext("2d");
    // خلفية متدرّجة
    const g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,"#14100a"); g.addColorStop(.5,shade(hex,-35)); g.addColorStop(1,"#14100a");
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    drawPattern(ctx,W,H);
    // إطار ذهبي
    ctx.strokeStyle="rgba(200,164,77,.55)"; ctx.lineWidth=3; ctx.strokeRect(48,48,W-96,H-96);
    ctx.direction="rtl"; ctx.textAlign="center";
    // علامة اقتباس
    ctx.fillStyle="rgba(200,164,77,.55)"; ctx.font="700 190px Amiri"; ctx.fillText("\u201D",W/2,300);
    // نصّ الاقتباس
    const lines=wrapText(ctx,q.text,"500 58px Amiri",W-260);
    ctx.fillStyle="#f3ecdd"; ctx.font="500 58px Amiri";
    let y=H/2-(lines.length*90)/2+30;
    lines.forEach(l=>{ ctx.fillText(l,W/2,y); y+=90; });
    // فاصل
    ctx.strokeStyle="rgba(200,164,77,.7)"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(W/2-45,y+8); ctx.lineTo(W/2+45,y+8); ctx.stroke();
    // الكاتب
    ctx.fillStyle="#c8a44d"; ctx.font="700 46px Tajawal"; ctx.fillText(q.author,W/2,y+80);
    // اسم الموقع
    ctx.fillStyle="rgba(243,236,221,.6)"; ctx.font="400 34px Tajawal";
    ctx.fillText("حِكَم وأشعار · "+location.host,W/2,H-95);
    // تنزيل
    try{
      const url=canvas.toDataURL("image/png");
      const a=document.createElement("a"); a.href=url; a.download="moqtabas-"+id+".png"; document.body.appendChild(a); a.click(); a.remove();
      showToast("نُزّلت الصورة ✔ جاهزة للنشر");
    }catch(e){ console.warn("card:",e); showToast("تعذّر إنشاء الصورة"); }
  }

  /* التصفية عند الضغط على وسم داخل بطاقة */
  function filterTopic(t){
    activeTopic=t; resetPage();
    document.querySelectorAll(".tchip").forEach(x=>x.classList.toggle("active", x.textContent===t));
    render();
    window.scrollTo({top:document.getElementById("topicFilters").offsetTop-80, behavior:"smooth"});
  }

  document.getElementById("sgSend").addEventListener("click",async()=>{ const name=document.getElementById("sgName").value.trim(); const body=document.getElementById("sgBody").value.trim();
    if(!body){ showToast("اكتب اقتراحك أولاً"); return; } const btn=document.getElementById("sgSend"); btn.disabled=true;
    try{ await db.from("suggestions").insert({name:name||null,body}); document.getElementById("sgBody").value=""; document.getElementById("sgName").value=""; document.getElementById("sgThanks").style.display="block"; }
    catch(e){ console.warn("suggestion:",e); showToast("تعذّر الإرسال"); } btn.disabled=false; });

  function startPresence(){ try{ const ch=db.channel("online",{config:{presence:{key:Math.random().toString(36).slice(2)}}});
    ch.on("presence",{event:"sync"},()=>{ const n=Object.keys(ch.presenceState()).length; document.getElementById("presenceCount").textContent=n||1; })
      .subscribe(async(s)=>{ if(s==="SUBSCRIBED") await ch.track({t:Date.now()}); }); }catch(e){ document.getElementById("presence").style.display="none"; } }

  /* ═══════════ إضافة اقتباسات الأعضاء ومراجعتها ═══════════ */
  function openSubmit(){ if(!currentUser){ openAuth(); return; } document.getElementById("subMsg").textContent=""; document.getElementById("submitModal").classList.add("open"); }
  function closeSubmit(){ document.getElementById("submitModal").classList.remove("open"); }
  document.getElementById("submitModal").addEventListener("click",e=>{ if(e.target.id==="submitModal") closeSubmit(); });

  async function submitQuote(){
    if(!currentUser){ openAuth(); return; }
    const text=document.getElementById("subText").value.trim();
    const author=document.getElementById("subAuthor").value.trim();
    const cat=document.getElementById("subCat").value;
    const msg=document.getElementById("subMsg");
    if(!text||!author){ msg.className="auth-msg err"; msg.textContent="أدخل النصّ واسم الكاتب"; return; }
    const btn=document.getElementById("subSend"); btn.disabled=true;
    try{
      const {error}=await db.from("submissions").insert({text,author,cat,submitted_by:currentUser.id,submitter_name:currentName});
      if(error) throw error;
      msg.className="auth-msg ok"; msg.textContent="شكراً! أُرسل اقتباسك للمراجعة ✔";
      document.getElementById("subText").value=""; document.getElementById("subAuthor").value="";
    }catch(e){ console.warn("submit:",e); msg.className="auth-msg err"; msg.textContent="تعذّر الإرسال"; }
    btn.disabled=false;
  }

  async function openReview(){
    if(!isAdmin()) return;
    const modal=document.getElementById("reviewModal"); const list=document.getElementById("reviewList");
    list.innerHTML='<div class="fav-empty">جارِ التحميل…</div>'; modal.classList.add("open");
    try{
      const {data}=await db.from("submissions").select("*").eq("status","pending").order("created_at",{ascending:true});
      const rows=data||[];
      document.getElementById("reviewCount").textContent=rows.length? rows.length+" اقتباس بانتظار الموافقة" : "لا شيء بانتظار المراجعة";
      if(!rows.length){ list.innerHTML='<div class="fav-empty">لا اقتباسات معلّقة حالياً 🌿</div>'; return; }
      list.innerHTML=rows.map(r=>`<div class="review-item" id="rev-${r.id}">
        <div class="rq">${esc(r.text)}</div>
        <div class="rmeta">— ${esc(r.author)} · ${esc(r.cat)} · اقترحه ${esc(r.submitter_name||"عضو")}</div>
        <div class="rbtns">
          <button class="btn-approve" onclick="approveSubmission(${r.id})">✔ موافقة</button>
          <button class="btn-reject" onclick="rejectSubmission(${r.id})">✕ رفض</button>
        </div></div>`).join("");
    }catch(e){ console.warn("review:",e); list.innerHTML='<div class="fav-empty">تعذّر التحميل</div>'; }
  }
  function closeReview(){ document.getElementById("reviewModal").classList.remove("open"); }
  document.getElementById("reviewModal").addEventListener("click",e=>{ if(e.target.id==="reviewModal") closeReview(); });

  async function approveSubmission(id){
    try{ const {error}=await db.from("submissions").update({status:"approved"}).eq("id",id); if(error) throw error;
      const el=document.getElementById("rev-"+id); if(el) el.remove();
      showToast("تمّت الموافقة ✔"); await loadApproved(); render();
    }catch(e){ console.warn("approve:",e); showToast("تعذّر"); }
  }
  async function rejectSubmission(id){
    if(!confirm("رفض وحذف هذا الاقتباس؟")) return;
    try{ const {error}=await db.from("submissions").delete().eq("id",id); if(error) throw error;
      const el=document.getElementById("rev-"+id); if(el) el.remove(); showToast("رُفض الاقتباس ✕");
    }catch(e){ console.warn("reject:",e); showToast("تعذّر"); }
  }

  /* ═══════════ مكتبة الاقتباسات (المشرف) ═══════════ */

  async function loadApproved(){
    try{
      const {data}=await db.from("submissions").select("id,text,author,cat").eq("status","approved").order("created_at",{ascending:false});
      extraQuotes=(data||[]).map(r=>({ id:"s"+r.id, text:r.text, author:r.author, cat:r.cat, topics:[], img:null, community:true }));
    }catch(e){ console.warn("approved:",e); extraQuotes=[]; }
  }

  /* ═══════════ مكتبة الاقتباسات (المشرف) ═══════════ */
  async function loadLibrary(){
    try{
      const {data}=await db.from("lib_quotes").select("id,text,author,cat,topics").eq("status","published").order("created_at",{ascending:false});
      libQuotes=(data||[]).map(r=>({ id:"L"+r.id, text:r.text, author:r.author, cat:r.cat, topics:r.topics||[], img:null, library:true }));
    }catch(e){ console.warn("library:",e); libQuotes=[]; }
  }
  let libCurrentTab="draft";
  function openLibrary(){ if(!isAdmin()) return; document.getElementById("libMsg").textContent=""; document.getElementById("libraryModal").classList.add("open"); libTab("draft"); }
  function closeLibrary(){ document.getElementById("libraryModal").classList.remove("open"); }
  document.getElementById("libraryModal").addEventListener("click",e=>{ if(e.target.id==="libraryModal") closeLibrary(); });

  async function libAdd(){
    const text=document.getElementById("libText").value.trim();
    const author=document.getElementById("libAuthor").value.trim();
    const cat=document.getElementById("libCat").value;
    const topics=document.getElementById("libTopics").value.split(",").map(x=>x.trim()).filter(Boolean);
    const source=document.getElementById("libSource").value.trim()||null;
    const msg=document.getElementById("libMsg");
    if(!text||!author){ msg.className="auth-msg err"; msg.textContent="أدخل النصّ والكاتب"; return; }
    const btn=document.getElementById("libAddBtn"); btn.disabled=true;
    try{
      const {error}=await db.from("lib_quotes").insert({text,author,cat,topics,source,status:"draft",created_by:currentUser.id});
      if(error) throw error;
      msg.className="auth-msg ok"; msg.textContent="حُفظ كمسودّة ✔ (لن يظهر للزوّار حتى تنشره)";
      document.getElementById("libText").value=""; document.getElementById("libAuthor").value=""; document.getElementById("libTopics").value=""; document.getElementById("libSource").value="";
      libTab("draft");
    }catch(e){ console.warn("libadd:",e); msg.className="auth-msg err"; msg.textContent="تعذّر الحفظ"; }
    btn.disabled=false;
  }
  function libTab(status){
    libCurrentTab=status;
    document.getElementById("tabDraft").classList.toggle("active",status==="draft");
    document.getElementById("tabPub").classList.toggle("active",status==="published");
    libRenderList();
  }
  async function libRenderList(){
    const box=document.getElementById("libList"); box.innerHTML='<div class="fav-empty">جارِ التحميل…</div>';
    try{
      const {data}=await db.from("lib_quotes").select("*").eq("status",libCurrentTab).order("created_at",{ascending:false});
      const rows=data||[];
      if(!rows.length){ box.innerHTML=`<div class="fav-empty">${libCurrentTab==="draft"?"لا مسوّدات — أضف اقتباساً بالأعلى":"لا اقتباسات منشورة بعد"}</div>`; return; }
      box.innerHTML=rows.map(r=>{
        const tp=(r.topics||[]).join("، ");
        const actions = libCurrentTab==="draft"
          ? `<button class="btn-approve" onclick="libPublish(${r.id})">نشر ✔</button>
             <button class="btn-reject" onclick="libDelete(${r.id})">حذف 🗑</button>`
          : `<button style="background:var(--muted)" onclick="libUnpublish(${r.id})">إلغاء النشر</button>
             <button class="btn-reject" onclick="libDelete(${r.id})">حذف 🗑</button>`;
        return `<div class="lib-item" id="lib-${r.id}">
          <div class="lq">${esc(r.text)}</div>
          <div class="lm">— ${esc(r.author)} · ${esc(r.cat)}${tp?" · "+esc(tp):""}${r.source?" · "+esc(r.source):""}</div>
          <div class="lb">${actions}</div>
        </div>`;
      }).join("");
    }catch(e){ console.warn("liblist:",e); box.innerHTML='<div class="fav-empty">تعذّر التحميل</div>'; }
  }
  async function libPublish(id){
    try{ const {error}=await db.from("lib_quotes").update({status:"published"}).eq("id",id); if(error) throw error;
      showToast("نُشر الاقتباس ✔"); const el=document.getElementById("lib-"+id); if(el) el.remove();
      await loadLibrary(); render();
    }catch(e){ console.warn("libpub:",e); showToast("تعذّر"); }
  }
  async function libUnpublish(id){
    try{ const {error}=await db.from("lib_quotes").update({status:"draft"}).eq("id",id); if(error) throw error;
      showToast("أُعيد إلى المسوّدات"); const el=document.getElementById("lib-"+id); if(el) el.remove();
      await loadLibrary(); render();
    }catch(e){ console.warn("libunpub:",e); showToast("تعذّر"); }
  }
  async function libDelete(id){
    if(!confirm("حذف هذا الاقتباس نهائياً؟")) return;
    try{ const {error}=await db.from("lib_quotes").delete().eq("id",id); if(error) throw error;
      showToast("حُذف 🗑"); const el=document.getElementById("lib-"+id); if(el) el.remove();
      await loadLibrary(); render();
    }catch(e){ console.warn("libdel:",e); showToast("تعذّر"); }
  }

  /* ═══════════ قواعد المجتمع ═══════════ */
  function openRules(ev){ if(ev) ev.preventDefault(); document.getElementById("rulesModal").classList.add("open"); }
  function closeRules(){ document.getElementById("rulesModal").classList.remove("open"); }
  document.getElementById("rulesModal").addEventListener("click",e=>{ if(e.target.id==="rulesModal") closeRules(); });

  /* ═══════════ الملف الشخصي ═══════════ */
  async function openProfile(){
    if(!currentUser){ openAuth(); return; }
    const modal=document.getElementById("profileModal");
    document.getElementById("pfAvatar").textContent=(currentName||"?").trim().charAt(0);
    document.getElementById("pfName").textContent=currentName;
    document.getElementById("pfEmail").textContent=currentUser.email||"";

    // المفضّلة
    const favIds=Object.keys(likedByMe).filter(k=>likedByMe[k]);
    const favs=allQuotes().filter(q=>favIds.includes(q.id));
    document.getElementById("pfFavs").innerHTML = favs.length
      ? favs.map(q=>`<div class="fav-item">${esc(q.text)}<span class="fa">— ${esc(q.author)}</span></div>`).join("")
      : `<div class="fav-empty" style="padding:1rem">لا مفضّلة بعد.</div>`;

    // آخر تعليقاتي (جلب من قاعدة البيانات)
    const cbox=document.getElementById("pfComments");
    cbox.innerHTML=`<div class="fav-empty" style="padding:1rem">جارِ التحميل…</div>`;
    let myComments=[];
    try{
      const {data}=await db.from("comments").select("body,quote_id,created_at").eq("user_id",currentUser.id).order("created_at",{ascending:false}).limit(10);
      myComments=data||[];
    }catch(e){ console.warn("profile comments:",e); }

    document.getElementById("pfStats").innerHTML=`
      <div class="pstat"><div class="num">${favs.length}</div><div class="lbl">مفضّلة</div></div>
      <div class="pstat"><div class="num">${myComments.length}</div><div class="lbl">تعليق</div></div>`;

    if(!myComments.length){ cbox.innerHTML=`<div class="fav-empty" style="padding:1rem">لم تكتب تعليقات بعد.</div>`; }
    else{
      cbox.innerHTML=myComments.map(c=>{
        const q=allQuotes().find(x=>x.id===c.quote_id);
        const on=q?`على اقتباس ${esc(q.author)}`:"";
        return `<div class="pf-comment"><div class="pq">${on}</div>${esc(c.body)}</div>`;
      }).join("");
    }
    modal.classList.add("open");
  }
  function closeProfile(){ document.getElementById("profileModal").classList.remove("open"); }
  document.getElementById("profileModal").addEventListener("click",e=>{ if(e.target.id==="profileModal") closeProfile(); });

  /* ═══════════ مفضّلتي ═══════════ */
  function openFavs(){
    const modal=document.getElementById("favModal");
    const favIds=Object.keys(likedByMe).filter(k=>likedByMe[k]);
    const favs=allQuotes().filter(q=>favIds.includes(q.id));
    document.getElementById("favCount").textContent=favs.length? favs.length+" اقتباس محفوظ" : "";
    const list=document.getElementById("favList");
    if(!favs.length){
      list.innerHTML=`<div class="fav-empty">لم تحفظ أي اقتباس بعد.<br>اضغط ♥ على أي اقتباس ليُضاف إلى مفضّلتك.</div>`;
    } else {
      list.innerHTML=favs.map(q=>`<div class="fav-item">${esc(q.text)}<span class="fa">— ${esc(q.author)} · ${q.cat}</span></div>`).join("");
    }
    modal.classList.add("open");
  }
  function closeFavs(){ document.getElementById("favModal").classList.remove("open"); }
  document.getElementById("favModal").addEventListener("click",e=>{ if(e.target.id==="favModal") closeFavs(); });

  /* ═══════════ نظام الحسابات (Authentication) ═══════════ */
  function openAuth(){ document.getElementById("authModal").classList.add("open"); document.getElementById("authMsg").textContent=""; }
  function closeAuth(){ document.getElementById("authModal").classList.remove("open"); }
  document.getElementById("authModal").addEventListener("click",e=>{ if(e.target.id==="authModal") closeAuth(); });

  function toggleAuthMode(ev){ if(ev) ev.preventDefault();
    authMode = authMode==="login" ? "signup" : "login";
    const isSignup=authMode==="signup";
    document.getElementById("authTitle").textContent=isSignup?"إنشاء حساب":"تسجيل الدخول";
    document.getElementById("afName").style.display=isSignup?"block":"none";
    document.getElementById("afSubmit").textContent=isSignup?"إنشاء الحساب":"دخول";
    document.getElementById("switchText").textContent=isSignup?"لديك حساب بالفعل؟":"ليس لديك حساب؟";
    document.getElementById("switchLink").textContent=isSignup?"سجّل الدخول":"أنشئ حساباً";
    document.getElementById("authMsg").textContent="";
  }

  function setAuthMsg(txt,type){ const m=document.getElementById("authMsg"); m.textContent=txt; m.className="auth-msg"+(type?" "+type:""); }

  async function submitAuth(){
    const email=document.getElementById("afEmail").value.trim();
    const pass=document.getElementById("afPass").value;
    const name=document.getElementById("afName").value.trim();
    if(!email||!pass){ setAuthMsg("أدخل البريد وكلمة المرور","err"); return; }
    const btn=document.getElementById("afSubmit"); btn.disabled=true;
    try{
      if(authMode==="signup"){
        if(!name){ setAuthMsg("أدخل اسمك الظاهر","err"); btn.disabled=false; return; }
        const {data,error}=await db.auth.signUp({email,password:pass});
        if(error) throw error;
        if(data.user){
          try{ await db.from("profiles").upsert({id:data.user.id,display_name:name}); }catch(e){ console.warn("profile:",e); }
        }
        if(data.session){ setAuthMsg("تمّ إنشاء حسابك ✔","ok"); await afterLogin(); }
        else{ setAuthMsg("تحقّق من بريدك لتأكيد الحساب ثم سجّل الدخول 📧","ok"); }
      } else {
        const {error}=await db.auth.signInWithPassword({email,password:pass});
        if(error) throw error;
        setAuthMsg("مرحباً بعودتك ✔","ok"); await afterLogin();
      }
    }catch(e){
      const msg=(e&&e.message)||"حدث خطأ";
      setAuthMsg(/invalid/i.test(msg)?"بيانات الدخول غير صحيحة":/registered|exists/i.test(msg)?"هذا البريد مسجّل مسبقاً":msg,"err");
    }
    btn.disabled=false;
  }

  async function afterLogin(){ await loadSession(); await loadLikes(); render(); setTimeout(closeAuth,700); }

  async function signOut(){ await db.auth.signOut(); currentUser=null; currentName=""; updateAuthUI(); await loadLikes(); render(); showToast("سُجّل خروجك"); }

  async function loadSession(){
    try{
      const {data}=await db.auth.getUser();
      currentUser=data&&data.user?data.user:null;
      if(currentUser){
        currentName=currentUser.email;
        try{ const {data:p}=await db.from("profiles").select("display_name").eq("id",currentUser.id).single();
          if(p&&p.display_name) currentName=p.display_name; }catch(e){}
      }
    }catch(e){ currentUser=null; }
    updateAuthUI();
  }

  function updateAuthUI(){
    const bar=document.getElementById("authbar");
    if(currentUser){
      const initial=(currentName||"?").trim().charAt(0);
      const adminBadge=isAdmin()?`<span class="admin-badge">مشرف</span>`:"";
      bar.innerHTML=`<span class="auth-user"><span class="avatar">${esc(initial)}</span>
        <span>مرحباً، <span class="uname">${esc(currentName)}</span>${adminBadge}</span>
        <button class="auth-fav" onclick="openSubmit()">✍️ أضف اقتباساً</button>
        ${isAdmin()?`<button class="auth-fav" style="border-color:var(--c-hob);color:var(--c-hob)" onclick="openReview()">🛠 مراجعة</button>`:""}
        ${isAdmin()?`<button class="auth-fav" style="border-color:var(--ochre);color:var(--ochre)" onclick="openLibrary()">📚 المكتبة</button>`:""}
        <button class="auth-fav" onclick="openProfile()">👤 ملفّي</button>
        <button class="auth-fav" onclick="openFavs()">🔖 مفضّلتي</button>
        <button class="auth-logout" onclick="signOut()">خروج</button></span>`;
    } else {
      bar.innerHTML=`<button class="auth-btn" onclick="openAuth()">دخول / تسجيل</button>`;
    }
  }

  /* ═══════════ الإقلاع ═══════════ */
  (async function init(){ renderDaily(); render(); startPoets();
    if(SUPABASE_URL.startsWith("http")){
      await loadSession();
      await loadApproved();
      await loadLibrary();
      await loadLikes(); render();
      startPresence();
    } else { document.getElementById("presence").style.display="none"; }
  })();
