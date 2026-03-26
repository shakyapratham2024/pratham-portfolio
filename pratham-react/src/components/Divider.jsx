export default function Divider({ fill, bg, path }) {
  return (
    <div style={{display:'block',lineHeight:0,overflow:'hidden',margin:0,padding:0,marginTop:'-1px',background:bg}}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{display:'block',width:'100%',height:'80px'}}>
        <path d={path} fill={fill} />
      </svg>
    </div>
  )
}
