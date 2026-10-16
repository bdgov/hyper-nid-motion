import React from 'react';
import {Audio} from '@remotion/media';
import {Composition, AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import '@fontsource/hind-siliguri/400.css';
import '@fontsource/hind-siliguri/600.css';
import '@fontsource/hind-siliguri/700.css';
import {theme, scenes} from './theme';

const FPS = 30;
const DURATION = Math.round(40.4 * FPS);
const ENABLE_VOICEOVER = false;

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

function Grid({variant=0}:{variant?:number}) {
  const frame = useCurrentFrame();
  const drift = variant < 2 ? frame * 0.45 : frame * (variant === 2 ? 0.8 : 0.55);
  const opacity = interpolate(frame, [0, 18], [0, 0.9], clamp);
  const scale = variant >= 5 ? interpolate(frame, [0, 90], [1, 1.06], clamp) : 1;
  return <AbsoluteFill style={{opacity, scale, transformOrigin:'center', overflow:'hidden'}}>
    <div style={{position:'absolute', inset:-120, backgroundImage:`linear-gradient(${theme.line} 1px, transparent 1px),linear-gradient(90deg, ${theme.line} 1px, transparent 1px)`, backgroundSize:'52px 52px', backgroundPosition:`${drift}px ${variant===2 ? drift : drift*0.35}px`, transform: variant===2 ? 'rotate(0.8deg)' : 'none'}}/>
    <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 50% 35%, rgba(255,22,31,0.13), transparent 48%)'}}/>
  </AbsoluteFill>
}

function Pill({children, active=false}:{children:React.ReactNode; active?:boolean}) {
  return <div style={{padding:'10px 18px', borderRadius:999, border:`1px solid ${active?theme.accent:'rgba(255,255,255,0.12)'}`, background:active?'rgba(255,22,31,0.16)':'rgba(255,255,255,0.05)', color:active?theme.text:theme.muted, fontSize:24, fontWeight:600}}>{children}</div>
}

function Phone({children, x=0, y=0, scale=1}:{children:React.ReactNode;x?:number;y?:number;scale?:number}) {
  return <div style={{position:'absolute', width:760, height:1420, left:'50%', top:'50%', translate:`calc(-50% + ${x}px) calc(-50% + ${y}px)`, scale, borderRadius:58, border:'3px solid rgba(255,255,255,0.16)', background:'#090a0c', boxShadow:theme.shadow, overflow:'hidden'}}>
    <div style={{height:88, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:25, fontWeight:600, borderBottom:'1px solid rgba(255,255,255,0.08)'}}>Telegram</div>
    <div style={{position:'absolute', left:0, right:0, top:88, bottom:0, background:'linear-gradient(160deg,#121417,#08090b)'}}>{children}</div>
  </div>
}

function Bubble({children, right=false, accent=false, delay=0}:{children:React.ReactNode;right?:boolean;accent?:boolean;delay?:number}) {
  const f=useCurrentFrame();
  const p=interpolate(f,[delay,delay+14],[0,1],clamp);
  return <div style={{opacity:p, translate:`0 ${interpolate(p,[0,1],[24,0])}px`, alignSelf:right?'flex-end':'flex-start', maxWidth:'82%', padding:'18px 22px', borderRadius:26, background:accent?theme.hero:'rgba(255,255,255,0.09)', color:'#fff', fontSize:27, lineHeight:1.25, marginBottom:16}}>{children}</div>
}

function SearchBar(){
 const f=useCurrentFrame();
 const typed=interpolate(f,[0,38],[0,18],clamp);
 return <div style={{position:'absolute',left:'50%',top:300,translate:'-50% 0',width:860,height:110,borderRadius:32,background:'#111215',border:'2px solid rgba(255,255,255,.12)',display:'flex',alignItems:'center',padding:'0 32px',boxShadow:theme.shadow}}>
   <div style={{fontSize:42,color:theme.muted,marginRight:18}}>⌕</div>
   <div style={{fontFamily:theme.mono,fontSize:31,color:'#fff',whiteSpace:'nowrap',overflow:'hidden',width:`${typed/18*700}px`}}>Hyper NID Info Bot</div>
   <div style={{marginLeft:'auto',width:12,height:42,background:theme.hero,opacity:f%18<9?1:.25}}/>
 </div>
}

function Scene1(){const f=useCurrentFrame(); const p=interpolate(f,[0,18],[0,1],clamp); return <AbsoluteFill><Grid variant={0}/><div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:80,textAlign:'center'}}>
 <Img src={staticFile('hyper-nid-logo.jpg')} style={{width:380,height:380,objectFit:'cover',borderRadius:190,opacity:p,scale:interpolate(f,[0,18],[0.82,1],{...clamp,easing:Easing.bezier(.16,1,.3,1)}),boxShadow:'0 20px 80px rgba(255,22,31,.22)'}}/>
 <div style={{marginTop:50,fontSize:66,fontWeight:700,color:'#fff',lineHeight:1.08,opacity:p}}>সেকেন্ডেই <span style={{color:theme.hero}}>NID তথ্য</span></div>
 <div style={{marginTop:22,fontSize:34,color:theme.muted,opacity:interpolate(f,[12,28],[0,1],clamp)}}>Hyper NID Info Bot</div>
 </div></AbsoluteFill>}

function Scene2(){const f=useCurrentFrame(); return <AbsoluteFill><Grid variant={1}/><SearchBar/><Phone y={520} scale={0.72}><div style={{padding:30,display:'flex',flexDirection:'column',height:'100%',justifyContent:'flex-end'}}><Bubble right accent delay={26}>Hyper NID Info Bot</Bubble><Bubble delay={44}>Welcome 👋</Bubble><div style={{height:82,borderRadius:22,background:theme.hero,display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:700,marginBottom:70,opacity:interpolate(f,[55,68],[0,1],clamp)}}>START</div></div></Phone><div style={{position:'absolute',left:80,right:80,bottom:150,textAlign:'center',fontSize:48,fontWeight:700,color:'#fff'}}>Telegram-এ সার্চ করুন</div></AbsoluteFill>}

function Scene3(){const f=useCurrentFrame(); return <AbsoluteFill><Grid variant={2}/><Phone y={30} scale={0.78}><div style={{padding:32}}><div style={{fontSize:42,fontWeight:700,color:'#fff',marginBottom:34}}>Hyper NID Info Bot</div><Bubble accent>Menu</Bubble><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,marginTop:28}}>{['NID Search','Token','Refer','Redeem Code'].map((t,i)=><div key={t} style={{height:100,borderRadius:24,border:`2px solid ${i===0?theme.hero:'rgba(255,255,255,.08)'}`,background:i===0?'rgba(255,22,31,.14)':'rgba(255,255,255,.04)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:25,fontWeight:600,color:'#fff',scale:i===0?interpolate(f,[0,12,24],[.96,1.04,1],clamp):1}}>{t}</div>)}</div></div></Phone><div style={{position:'absolute',left:80,right:80,bottom:150,textAlign:'center',fontSize:52,fontWeight:700}}>তারপর <span style={{color:theme.hero}}>NID Search</span></div></AbsoluteFill>}

function InputCard({label,value,delay}:{label:string;value:string;delay:number}){const f=useCurrentFrame(); const p=interpolate(f,[delay,delay+12],[0,1],clamp); return <div style={{opacity:p,marginBottom:24}}><div style={{fontSize:24,color:theme.muted,marginBottom:10}}>{label}</div><div style={{height:92,borderRadius:22,border:'2px solid rgba(255,255,255,.1)',background:'#101114',display:'flex',alignItems:'center',padding:'0 24px',fontFamily:theme.mono,fontSize:29,color:'#fff'}}>{value}<span style={{width:3,height:34,background:theme.hero,marginLeft:6,opacity:f%18<9?1:.2}}/></div></div>}
function Scene4(){const f=useCurrentFrame(); const load=interpolate(f,[110,150],[0,100],clamp); return <AbsoluteFill><Grid variant={2}/><Phone y={0} scale={0.8}><div style={{padding:38}}><div style={{fontSize:40,fontWeight:700,color:'#fff',marginBottom:30}}>NID Search</div><InputCard label="NID নম্বর" value="1987 6543 2109" delay={5}/><InputCard label="জন্ম তারিখ" value="12 / 08 / 1995" delay={42}/><div style={{marginTop:30,height:16,borderRadius:20,background:'rgba(255,255,255,.08)',overflow:'hidden'}}><div style={{height:'100%',width:`${load}%`,background:theme.hero}}/></div><div style={{marginTop:18,textAlign:'center',fontSize:26,color:theme.muted}}>{load<100?`Loading… ${Math.round(load)}%`:'Verified ✓'}</div></div></Phone><div style={{position:'absolute',left:70,right:70,bottom:130,textAlign:'center',fontSize:48,fontWeight:700}}>NID + জন্ম তারিখ দিন</div></AbsoluteFill>}

function ResultRow({k,v,i}:{k:string;v:string;i:number}){const f=useCurrentFrame(); const p=interpolate(f,[i*10, i*10+14],[0,1],clamp); return <div style={{opacity:p,display:'flex',justifyContent:'space-between',padding:'18px 0',borderBottom:'1px solid rgba(255,255,255,.08)',fontSize:25}}><span style={{color:theme.muted}}>{k}</span><span style={{color:'#fff',fontWeight:600}}>{v}</span></div>}
function Scene5(){return <AbsoluteFill><Grid variant={3}/><div style={{position:'absolute',left:60,right:60,top:190,bottom:190,borderRadius:40,background:'rgba(15,16,19,.9)',border:'1px solid rgba(255,255,255,.1)',boxShadow:theme.shadow,padding:38}}><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:28}}><div style={{fontSize:39,fontWeight:700}}>NID Result</div><Pill active>✓ Verified</Pill></div>{[['নাম','••••••••'],['পিতা','••••••••'],['মাতা','••••••••'],['জন্ম তারিখ','••/••/••••'],['ঠিকানা','••••••••••'],['ধর্ম','••••'],['লিঙ্গ','••••']].map(([k,v],i)=><ResultRow key={k} k={k} v={v} i={i}/>)}</div><div style={{position:'absolute',left:70,right:70,bottom:92,textAlign:'center',fontSize:40,fontWeight:700}}>কয়েক সেকেন্ডেই <span style={{color:theme.hero}}>সব তথ্য</span></div></AbsoluteFill>}

function TokenBadge({text,delay=0}:{text:string;delay?:number}){const f=useCurrentFrame(); const p=interpolate(f,[delay,delay+16],[0,1],clamp); return <div style={{opacity:p,scale:interpolate(p,[0,1],[.8,1],clamp),padding:'18px 28px',borderRadius:26,background:'rgba(255,22,31,.13)',border:`2px solid ${theme.hero}`,fontSize:28,fontWeight:700,color:'#fff'}}>{text}</div>}
function Scene6(){return <AbsoluteFill><Grid variant={4}/><div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:30}}><div style={{fontSize:74,fontWeight:700}}>খরচ মাত্র <span style={{color:theme.hero}}>5 Token</span></div><div style={{fontSize:34,color:theme.muted}}>Token পাবেন ফ্রিতে</div><div style={{display:'flex',gap:22,marginTop:20}}><TokenBadge text="↗ Refer" delay={18}/><TokenBadge text="＋10 Token" delay={30}/><TokenBadge text="🎟 Redeem Code" delay={42}/></div><div style={{marginTop:20,width:820,height:240,borderRadius:38,background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:30,color:'#fff',textAlign:'center',padding:30}}>বন্ধুদের Refer করুন অথবা<br/>Free Redeem Code ব্যবহার করুন</div></div></AbsoluteFill>}

function Scene7(){const f=useCurrentFrame(); const p=interpolate(f,[0,18],[0,1],clamp); return <AbsoluteFill><Grid variant={5}/><div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:70}}><Img src={staticFile('hyper-nid-logo.jpg')} style={{width:300,height:300,borderRadius:150,objectFit:'cover',opacity:p,scale:interpolate(f,[0,18],[.75,1],clamp),boxShadow:'0 20px 90px rgba(255,22,31,.25)'}}/><div style={{marginTop:38,fontSize:72,fontWeight:700,lineHeight:1.05}}>তাহলে দেরি কেন?</div><div style={{marginTop:26,fontSize:54,fontWeight:700,color:theme.hero}}>এখনই Try করুন</div><div style={{marginTop:14,fontSize:39,fontWeight:600}}>Hyper NID Info Bot</div><div style={{marginTop:44,padding:'20px 46px',borderRadius:999,background:theme.hero,fontSize:34,fontWeight:700,boxShadow:'0 15px 50px rgba(255,22,31,.25)'}}>START NOW →</div></div></AbsoluteFill>}

function PreviewAudio(){if(!ENABLE_VOICEOVER) return null; return <Audio src={staticFile('voiceover.mp3')} volume={1} premountFor={FPS} />}

function Sfx({name,from,volume=0.24}:{name:string;from:number;volume?:number}){return <Sequence from={Math.round(from*FPS)} durationInFrames={Math.max(1,Math.round(.6*FPS))} premountFor={FPS}><Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} premountFor={FPS}/></Sequence>}

export const Main = () => {
 return <AbsoluteFill style={{background:theme.bg,fontFamily:theme.font,color:theme.text}}>
   <Grid variant={0}/>
   <Sequence from={0} durationInFrames={Math.round(scenes[0].to*FPS)} premountFor={FPS}><Scene1/></Sequence>
   <Sequence from={Math.round(scenes[1].from*FPS)} durationInFrames={Math.round((scenes[1].to-scenes[1].from)*FPS)} premountFor={FPS}><Scene2/></Sequence>
   <Sequence from={Math.round(scenes[2].from*FPS)} durationInFrames={Math.round((scenes[2].to-scenes[2].from)*FPS)} premountFor={FPS}><Scene3/></Sequence>
   <Sequence from={Math.round(scenes[3].from*FPS)} durationInFrames={Math.round((scenes[3].to-scenes[3].from)*FPS)} premountFor={FPS}><Scene4/></Sequence>
   <Sequence from={Math.round(scenes[4].from*FPS)} durationInFrames={Math.round((scenes[4].to-scenes[4].from)*FPS)} premountFor={FPS}><Scene5/></Sequence>
   <Sequence from={Math.round(scenes[5].from*FPS)} durationInFrames={Math.round((scenes[5].to-scenes[5].from)*FPS)} premountFor={FPS}><Scene6/></Sequence>
   <Sequence from={Math.round(scenes[6].from*FPS)} durationInFrames={Math.round((scenes[6].to-scenes[6].from)*FPS)} premountFor={FPS}><Scene7/></Sequence>
   <Sfx name="soft-thud" from={0.08} volume={0.28}/>
   <Sfx name="whoosh" from={4.72} />
   <Sfx name="click" from={8.1} />
   <Sfx name="click" from={12.35} />
   <Sfx name="tick" from={15.4} />
   <Sfx name="pop" from={20.95} />
   <Sfx name="chime" from={27.62} />
   <Sfx name="pop" from={33.38} />
   <Sfx name="whoosh" from={39.7} />
   <PreviewAudio />
 </AbsoluteFill>
}

export const RemotionRoot: React.FC = () => <>
 <Composition id="Main" component={Main} durationInFrames={DURATION} fps={FPS} width={1080} height={1920}/>
</>;

export default RemotionRoot;
