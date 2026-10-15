// Common English words, data only (story 2.3). The output guard lets a
// capitalised word open a sentence of an addition only when it is one of
// these or already in the pour's own words; anything else counts as a new
// proper noun ("Lisbon keeps the light…"). Lowercase, with straight
// apostrophes, as `foldWord` in ./reading.ts compares them. No proper nouns:
// names that double as words (days, months, "Rose", "Joy", "Art") are left out.
//
// Pure ES: no DOM, no Node, no network, no clock, no randomness.

const WORDS = `
a able about above across afraid after afterwards again against age ago ah ahead air alive all allow almost
alone along already also although always am among an and animal another answer any anybody anyone anything
anyway anywhere apple are aren't arm around as ask asked asking asks at ate autumn away baby back bad bag
balance ball bank bar bath be beach beautiful became because become becomes becoming bed been before
beforehand began begin beginning begins begun behind being believe believed believes bell below beneath beside
besides best better between beyond big bird birth bit bitter bitterness black blood blue board boat body bold
bone book both bottle bottom bowl box boy brave bread breath breathe bridge bright bring brings broken brother
brought brown build building builds built burn burned burns burnt busy but buy by cake call called calls calm
came can can't candle cannot car card care careful carried carries carry case cat catch caught celebrate
certain chair chance change changed changes cheap cheers child children choose chose chosen city clean clear
clever close closed closes cloud coast coat coffee cold color colour come comes coming common cook cooked cool
corner could couldn't count counted country courage course cover covered cried cruel cry cup curtain cut dance
danced dark darkness daughter dawn day dead dear death decide decided deep desk did didn't die died different
difficult dinner do does doesn't dog doing don't done door doubt down dozen drank dream dress drink drinks
drive drop dropped drove drunk dry during dust each ear early earth easy eat eaten eats edge egg eight either
else elsewhere empty end ended ends enjoy enough entire equal even evening ever every everybody everyone
everything everywhere exactly expect explain eye eyes face fact fair fall fallen falls false familiar family
famous far farm fast fat father fear feel feels fell felt few fewer field fifth fill filled finally find finds
fine finish finished fire first fish five fix fixed flat floor flower fly follow followed follows food foot
for foreign forest forget forgets forgive forgiven forgot found four fourth free fresh friend friends from
fruit full funny further future game garden garnish gather gathered gentle gently get gets getting gift girl
give given gives giving glad glass go goes going gold golden gone good goodbye got grass gray great green grew
grey grief ground group grow grown grows guess had hadn't hair half halfway hall hand hands happen happened
happy hard hardly has hasn't have haven't having he he'd he'll head hear heard heart heat heavy held hello
help helped her here hers herself hide high hill him himself his history hold holds home honest honesty hope
hoped horse hot hour house how however huge hundred hungry hurry i ice idea if imagine important in inside
instead into iron is island isn't it its itself job joke journey just keep keeps kept kind kindly kindness
kitchen knew knife know known knows lake land language large last late later laugh laughed laughter lay lazy
lead leaf lean learn learned learnt least leave leaves leaving left lemon lend less let let's letter level lie
lies life lift light like likely lime line linger lip list listen listened lit little live lived lives long
longing look looked looks loose lose loss lost loud love loved loves low lucky made main make makes making man
many market matter may maybe me meal mean means meant meet memory met middle might milk mind mine minute
mirror miss missed modern moment money moon more moreover morning most mostly mother mountain mouth move moved
much music must mustn't my myself name narrow natural nature near nearly neck need needed needn't needs
neither never nevertheless new next nice night nine no nobody noise none noone nor north nose not note nothing
notice noticed now nowhere ocean of off offer office often oh oil okay old on once one only onto open opened
opens or orange order ordinary other others otherwise our ours ourselves out outside over own page pain pale
paper parent part party pass passed past path patience pause pay peace pen people perfect perhaps person
picture piece place plain plan plant plate play played plays please pocket point poor possible pour poured
pours present pretty price private promise proud public pull push put question quick quickly quiet quietly
quite rain raise ran rare rarely rather reach reached read reads ready real really reason red remember
remembered rest return returned rich right rise risen rises river road rock roof room root rough round rule
run runs sad safe said salt salty same sand sat save savor savour saw say says school sea season second secret
see seed seem seemed seems seen sell send sent serve served set settle settled seven several shadow shake
shaken shall shape share sharp she she'd she'll ship shirt shoe shop shore short should shouldn't show showed
shown shut shy side sight sign silence silent silver simple simply since sing single sip sister sit sits six
skin sky sleep slept slow slowly small smell smile smiled smoke smooth snow so soft softly softness some
somebody someday somehow someone something sometime sometimes somewhat somewhere song soon sorry sound soup
sour south space speak speaks special spend spent spirit spoke spoken spring stand stands star start started
starts station stay stayed stays step still stillness stir stirred stone stood stop stopped story strain
strange street stretch strong study such sudden suddenly sugar summer sun supper sure surely sweet sweetness
table take taken takes taking talk talked tall taste tasted tea teach teacher tear tell tells ten than thank
thanks that the their theirs them themselves then there thereby therefore these they they'd they'll they're
they've thick thin thing things think thinks third this those though thought thousand three through throughout
throw thus till time tired to toast today together told tomorrow tongue tonight too took touch toward towards
town tree tried true truly trust truth try turn turned turns twice two ugly uncle under underneath understand
understood unless unlike until up upon us use used usual usually valley very via voice wait waited waits wake
walk walked walks wall want wanted wants warm warmed warmth was wasn't watch watched water wave way we we'd
we'll we're we've weak wear weather week weekend well were weren't wet what whatever when whenever where
wherever whether which while white who whoever whole whom whose why wide wife wild will wind window wine
winter wise wish wished with within without woman women won't wonder wondered wood word words work worked
works world worry would wouldn't write writes written wrong wrote year years yellow yes yesterday yet you
you'd you'll you're you've young your yours yourself yourselves youth
`;

export const COMMON_WORDS: ReadonlySet<string> = new Set(WORDS.split(/\s+/).filter(Boolean));
