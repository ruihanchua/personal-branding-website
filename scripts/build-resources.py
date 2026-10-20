from pathlib import Path
from html import escape as E
import json
root=Path(__file__).resolve().parent.parent; out=root/'resources'; out.mkdir(exist_ok=True)
groups={
'Your starting point':[
'Before I knew anything about [topic], I kept getting stuck on [specific problem].',
'The first time I tried [activity], the part I struggled with wasn’t [expected difficulty].',
'I didn’t start [project] feeling ready. I started with [small action].',
'At [stage of life], I thought [belief]. Then [experience] changed my mind.',
'My earliest attempt at [skill] taught me something I still use today.',
'If you’re starting [activity] with only [limited resource], here’s where I’d begin.',
'I wish I’d understood [lesson] before my first [experience].',
'The question I was too embarrassed to ask about [topic] was [question].',
'Here’s what [task] actually looked like when I was a beginner.',
'I used to wait for [condition] before trying [activity]. This helped me take the first step.'
],
'Lessons from real life':[
'A conversation about [ordinary subject] made me rethink [bigger idea].',
'I learned more about [skill] from [unexpected experience] than I expected.',
'[Everyday moment] reminded me why [principle] matters.',
'One detail from [experience] has stayed with me: [detail].',
'I handled [situation] differently this time. Here’s what I changed.',
'Something went wrong during [activity]. The useful part came afterwards.',
'I thought the lesson from [experience] was [first interpretation]. Now I see it as [new interpretation].',
'A small decision during [project] changed how I approach [task].',
'This is the part of [experience] I would repeat—and the part I wouldn’t.',
'If I could leave a note for myself before [event], it would say [message].'
],
'What you believe':[
'I care more about [priority] than [common priority] when I’m doing [work].',
'My view on [topic] changed after I saw [specific observation].',
'I agree with [advice]—until [important exception].',
'[Popular approach] works for some people. Here’s why I choose [alternative].',
'There’s a difference between [concept A] and [concept B] that matters in [context].',
'For me, doing [activity] well means [personal definition].',
'I don’t think [common metric] tells the whole story of [goal].',
'Here’s a belief about [topic] I’m still questioning.',
'I used to judge [choice] differently before I understood [context].',
'When people disagree about [topic], I think they’re often solving different problems.'
],
'Explain your expertise':[
'When someone asks me about [topic], I start with this question: [question].',
'If [term] sounds confusing, picture [simple comparison].',
'You can tell a lot about [situation] by looking at [specific signal].',
'Here’s how I explain [concept] to someone encountering it for the first time.',
'Before choosing [tool or approach], check [relevant condition].',
'The part of [process] people see is [visible part]. The part that makes it work is [less visible part].',
'When [problem] happens, I check [factor] before changing [other factor].',
'Here’s one way to practise [skill] using something you already have.',
'If you understand [basic idea], [complex idea] becomes easier to follow.',
'To make sense of [topic], separate [element A] from [element B].'
],
'Behind your work':[
'This is what happens between [starting point] and [finished output].',
'Before I start [task], I spend a moment on [preparation].',
'The least glamorous part of my [work or routine] is also one of the most useful.',
'I made this choice in [piece of work] because [reason].',
'Here’s something I removed from [project] and why it didn’t belong.',
'This rough draft shows the decision that shaped the final [output].',
'A normal day working on [activity] includes more [unexpected task] than you might think.',
'When I’m stuck on [task], this is the next thing I try.',
'The tool I use for [job] matters less than how I [specific action].',
'Come with me while I work through one small part of [project].'
],
'Help someone feel understood':[
'If [task] keeps moving to tomorrow, what’s making it hard to start?',
'You can know a lot about [topic] and still feel unsure about [action].',
'The awkward part of [new activity] that I rarely hear people discuss is [detail].',
'If you keep rewriting [thing], try deciding [one boundary] first.',
'When [challenge] feels overwhelming, I shrink the next step to [action].',
'You don’t have to share [private detail] to talk honestly about [lesson].',
'If [common advice] doesn’t fit your life, here’s a smaller option to consider.',
'I recognise that feeling of [emotion] before [activity]. This is what helps me.',
'Not being able to do [large task] today doesn’t rule out [small task].',
'Before you call yourself [negative label], look at what [task] is asking of you.'
],
'Decisions and trade-offs':[
'I chose [option A] over [option B] for this project. Here was the trade-off.',
'Both [approach A] and [approach B] can work. I’d choose based on [condition].',
'Here are the questions I’d ask before spending time on [activity].',
'If your priority is [goal], [choice] may matter more than [other choice].',
'One reason I stopped using [approach] was [specific limitation].',
'I keep [habit] simple so I can spend more attention on [priority].',
'Before saying yes to [opportunity], I wanted to understand [detail].',
'Choosing [option] solved [problem], but it introduced [new challenge].',
'I would use [method] for [context], but reconsider it for [different context].',
'The decision wasn’t whether [option] was good. It was whether it suited [situation].'
],
'Questions worth answering':[
'Someone asked me, “[real question]”. Here’s the part I’d answer first.',
'What would you do if [specific situation]? Here’s how I’d think it through.',
'Can you [goal] without [assumed requirement]? It depends on [condition].',
'How do you know when [task] is ready? I look for [criterion].',
'What should a beginner notice about [topic]? Start with [detail].',
'Why does [recurring problem] keep happening? One possibility is [explanation].',
'When is [popular advice] actually useful? Here’s the context I’d look for.',
'If I had only [time available] for [activity], what would I prioritise?',
'What’s worth keeping when you simplify [process]?',
'How would I approach [task] differently if [constraint] changed?'
],
'Progress without hype':[
'I’m still learning [skill]. Here’s one thing I can do now that I couldn’t before.',
'This isn’t the finished version of [project]. It’s the next version.',
'I tried [change] during [period]. Here’s what I noticed—and what I can’t conclude yet.',
'The clearest sign of progress in my [activity] wasn’t a number. It was [observable change].',
'I’m keeping [part of approach] and changing [other part] after this attempt.',
'Looking back at [earlier work], I can see where my thinking has changed.',
'I expected [outcome] from [attempt]. What actually happened was [observation].',
'One adjustment made [specific task] easier for me: [adjustment].',
'Here’s what I know so far about [ongoing project], and what I’m still testing.',
'I’m sharing this before it feels polished because [honest reason].'
],
'Your work and the people it helps':[
'People often come to [your work] wanting [surface goal]. First, I ask about [underlying need].',
'If you’re considering help with [task], here’s what working together would involve.',
'A useful brief for [service] starts with [information], not [common starting point].',
'The part of [service] I want people to understand before they enquire is [expectation].',
'Here’s what you bring to [collaboration], and what I help with.',
'One thing I can help with is [specific deliverable]. Here’s what that means in practice.',
'[Service] may be a fit if you’re dealing with [problem] and want [realistic support].',
'Before we talk about [deliverable], I want to understand [person’s context].',
'This is the question I’d encourage you to ask anyone offering [service].',
'If you want support with [task], you can start by telling me [simple next step].'
]}
assert sum(map(len,groups.values()))==100
css=(root/'fonts.css').read_text()+'\n'+'''@page{size:A4;margin:17mm 17mm 18mm}*{box-sizing:border-box}body{font:11pt/1.6 Manrope,Arial,sans-serif;color:#243c32;background:#f4f1ea;margin:0}h1,h2,h3{line-height:1.16;letter-spacing:-.04em}h1{font-size:44pt;margin:30mm 0 9mm}h2{font-size:29pt;margin:7mm 0}h3{font-size:14pt;margin:5mm 0 2mm}em{font-family:'Playfair Display',Georgia,serif;color:#4e8e75}p{margin:0 0 4mm}.page{break-after:page}.page:last-child{break-after:auto}.label{font-size:9pt;font-weight:800;letter-spacing:.12em;color:#35654f}.brand{border-bottom:1px solid #ccd5c8;padding-bottom:4mm;font-weight:800}.bottom{margin-top:9mm;border-top:1px solid #ccd5c8;padding-top:4mm;font-size:9pt}.hook{display:grid;grid-template-columns:10mm 1fr;gap:3mm;border-bottom:1px solid #ccd5c8;padding:3mm 0;break-inside:avoid;font-size:10.3pt}.num{color:#35654f;font-weight:800}.box{padding:5mm;background:#e5ebe1;border-radius:3mm;margin:5mm 0;break-inside:avoid}ul,ol{padding-left:6mm}li{margin-bottom:2mm}a{color:#35654f}.cover-note{max-width:140mm;font-size:15pt}.note{font-size:9pt;color:#4b6055}'''
# absolute font URLs work when HTML is served by local route
css=css.replace("url('fonts/", "url('https://ray-resources.test/fonts/")
def page(label,title,body):return '<section class="page"><div class="brand">ray chua ✦ <span class="label">FREE CONTENT STARTER KIT</span></div><p class="label" style="margin-top:6mm">'+label+'</p><h2>'+title+'</h2>'+body+'</section>'
def doc(title,pages):return '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>'+title+'</title><style>'+css+'</style></head><body>'+''.join(pages)+'</body></html>'
end='<div class="bottom">Ray Chua · Content ideas, scripting guidance and editing.<br>Want hands-on support? <a href="https://form.typeform.com/to/IFkJ6hF7">Tell me what you’re building</a> · <a href="https://www.instagram.com/ray.chuaa/">@ray.chuaa</a></div>'
pages=[page('100 ORIGINAL STARTING POINTS','Your stories.<br>Your next <em>first line.</em>','<p class="cover-note">100 hook templates for professionals, freelancers, business owners and people ready to start sharing.</p><div class="box">You don’t need a dramatic life story. Begin with something you’ve noticed, learned, tried or changed your mind about.</div><h3>Make the template yours</h3><ol><li>Choose a real experience or useful idea first.</li><li>Pick a first line that fits it. Replace every bracket with a specific detail.</li><li>Deliver what the opening promises. Remove anything you can’t honestly support.</li></ol><p class="note">Original prompts by Ray Chua. These are creative starting points, not tested promises of views, clients or income. No fabricated stories, testimonials or results needed.</p>')]
n=0
for name,items in groups.items():
 body='<p>Choose a line that fits something you can genuinely speak about.</p>'
 for item in items:n+=1;body+=f'<div class="hook"><span class="num">{n:03}</span><span>{E(item)}</span></div>'
 pages.append(page(f'HOOKS {n-9:03}–{n:03}',E(name),body))
pages.append(page('FROM FIRST LINE TO FIRST POST','Keep it <em>honest.</em> Keep it useful.','<div class="box"><strong>Before you record</strong><ul><li>Does this sound like something I would actually say?</li><li>Can I fulfil the opening with one clear story, explanation or demonstration?</li><li>Am I presenting personal experience as personal experience?</li><li>Have I removed private details or obtained permission to share them?</li></ul></div><p>Use the companion format guide to give your idea a shape. A strong opening introduces something worth hearing; it doesn’t replace the substance.</p><p>Try a small batch. Notice which topics bring thoughtful replies and relevant conversations, not only views. Performance varies; no single hook works for everyone.</p>'+end))
(out/'100-personal-brand-hook-templates.html').write_text(doc('100 Personal Brand Hook Templates — Ray Chua',pages))
formats=[
('The moment that changed your mind','Help people understand your perspective.','A small incident, conversation or turning point.',['Set the scene: what did you believe or expect?','Describe the moment that challenged it.','Explain what you do or think differently now.'],'Open on the relevant moment; avoid a long life history.','What changed my mind about [topic] was [specific moment].','What would you interpret differently if it happened again?'),
('One useful lesson','Share expertise without delivering an entire course.','A question you understand well or a mistake you can explain.',['Name one specific difficulty.','Explain one practical action and why it helps.','Clarify when it applies and any important limits.'],'Show the action if it is easier to see than explain.','Before trying [task], check [one relevant detail].','What is one thing someone could try after watching?'),
('Your point of view','Make your reasoning recognisable.','An opinion you can support with experience or evidence.',['State the view plainly.','Give the observation or reasoning behind it.','Acknowledge an exception or trade-off.'],'Disagree with an idea without attacking a person.','I care more about [priority] than [common priority] in [context].','Where does your view stop being useful?'),
('Behind the decision','Show the thought behind your work.','A choice you made during a project or routine.',['Show the task or work in progress.','Explain one choice you made.','Describe the trade-off or intended benefit.'],'Use your own screen, notes or footage; clear client permissions first.','I changed [detail] in this [output] because [reason].','What would an outsider miss about this decision?'),
('Show one small process','Make your expertise tangible.','A manageable task someone can watch or follow.',['Show the starting state.','Demonstrate the essential steps.','Show the output and explain what to check.'],'Use captions that clarify the action, rather than covering the frame.','Here’s how I approach one small part of [task].','What does a beginner need to notice at each step?'),
('Answer a real question','Respond to something your audience needs.','A genuine question from a conversation, enquiry or comment.',['State the question without exposing private details.','Give the direct answer.','Explain the condition or next step that matters.'],'If you invent a useful hypothetical question, label it as a question you would ask—not a real audience message.','How do you know when [task] is ready?','What assumption behind the question needs explaining?'),
('An honest progress update','Build familiarity while you learn or develop something.','A change you can describe accurately.',['Say what you tried and why.','Share what you observed.','Say what you’ll keep, change or investigate next.'],'Distinguish observations from causes; do not imply a change proved a result.','I tried [change]. Here’s what I noticed so far.','What is still uncertain?'),
('An invitation to work together','Help interested people understand your service.','A real offer with a clear scope.',['Describe the problem you help with.','Explain what you do and what the client contributes.','Give one next step and explain what follows.'],'Be specific about deliverables; avoid outcomes you cannot guarantee.','Here’s what you bring to [collaboration], and what I help with.','What would someone need to know before enquiring?')]
pages=[page('A PRACTICAL CONTENT-FORMAT GUIDE','Bring your stories.<br>Find their <em>shape.</em>','<p class="cover-note">Eight flexible formats to turn what you know, notice and experience into content that feels like you.</p><div class="box">Start with a person you want to help and one thing worth saying. Then choose the format that makes that idea easiest to understand.</div><p>Use these for spoken videos, voiceovers, carousels or written posts. You do not need to use every format, share your private life or manufacture a dramatic transformation.</p><h3>Your simplest starting point</h3><p>Write down one question you answered, one decision you made and one thing you learned this week. Choose one. Give it a shape using the pages that follow.</p>')]
for i,(name,purpose,bring,steps,tip,hook,prompt) in enumerate(formats,1):
 body=f'<p>{E(purpose)}</p><div class="box"><strong>Bring this</strong><p>{E(bring)}</p></div><h3>Give it a shape</h3><ol>'+''.join('<li>'+E(x)+'</li>' for x in steps)+f'</ol><h3>One possible opening</h3><p>{E(hook)}</p><h3>Make it yours</h3><p>{E(prompt)}</p><div class="box"><strong>Keep in mind</strong><p>{E(tip)}</p></div><p class="note">This is a flexible structure, not a required formula or guarantee of performance.</p>'
 pages.append(page(f'FORMAT {i:02} / 08',E(name),body))
pages.append(page('YOUR NEXT POST','A small plan.<br>A real <em>starting point.</em>','<ol><li><strong>Who is this for?</strong> Name a person or situation, rather than everyone.</li><li><strong>What is the one idea?</strong> Write it in a sentence.</li><li><strong>What can I actually show or explain?</strong> Choose real material.</li><li><strong>Which format fits?</strong> Pick from the eight; change it if needed.</li><li><strong>What should they take away?</strong> A useful thought, practical action or clearer understanding.</li></ol><div class="box"><strong>Before you share</strong><p>Check accuracy, permissions, readable text and clear sound. Remove details that distract from your main idea. You can be honest without revealing anything you want to keep private.</p></div><p>After posting, consider useful replies, saves and relevant enquiries alongside views. Use what you learn to choose the next idea. Avoid treating one post as proof that an approach always works.</p>'+end))
(out/'story-to-content-format-guide.html').write_text(doc('Story to Content — Ray Chua',pages))
print('Created original resources: 100 hooks across 10 categories; 8-format companion guide.')
