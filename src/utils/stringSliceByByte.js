const stringSliceByByte = (str, maxByte) => {
    let b=0, i=0, c='';
	for(b=i=0;c=str.charCodeAt(i);) {
      b+=c>>7?2:1;
      if (b > maxByte)
      break;
      i++;
    }
  	return str.substring(0,i);
}

export default stringSliceByByte;