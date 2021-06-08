

export const copy = async (text: string) => {
  if ('clipboard' in navigator) {
    try {
      await navigator.clipboard.writeText(text)
      console.log('success');

    } catch (error) {
      console.log(error);
    }
  } else {
    try {


      const node = document.createElement('textarea');
      node.textContent = text;
      node.style.position = 'absolute';
      node.style.left = '-100000px';
      document.body.appendChild(node);

      const selection = document.getSelection();
      selection!.removeAllRanges();

      const range = document.createRange();
      range.selectNodeContents(node);
      selection!.addRange(range);

      document.execCommand('copy');
      selection!.removeAllRanges();
      document.body.removeChild(node);
      console.log('success by node');
    } catch (error) {
      console.log(`error node: ${error}`);

    }
  }
}

export const share = async (text: string) => {
  const shareData: ShareData = {
    title: 'Studypen class invite link',
    text,
    url: `https://www.studypen.in/class/join/${text}`,
  }
  try {
    await navigator.share(shareData)
    // resultPara.textContent = 'MDN shared successfully'
    // alert("Shared successfully")
  } catch (err) {
    // alert(err)
    // resultPara.textContent = 'Error: ' + err
  }
}


export const strTime = (dateStr: string) => {
  const date = new Date(dateStr)
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12
  const minutesStr = minutes < 10 ? '0' + minutes : minutes
  return hours + ':' + minutesStr + ' ' + ampm
}