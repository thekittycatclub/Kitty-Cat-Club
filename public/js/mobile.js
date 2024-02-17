let Mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (Mobile) {
    alert("The site can't be used at this stage!");
}
