(() => {
	let isShow = !1,
		lock = !1;
	const btn = document.querySelector(".back-to-top");
	window.addEventListener("load", () => {
		if (
			document.body.scrollTop > 200 ||
			document.documentElement.scrollTop > 200
		) {
			btn.classList.add("load");
			isShow = !0;
		} else {
			btn.classList.remove("load");
			isShow = !1;
		}
	});
	const handleScroll = () => {
		if (lock) return;
		if (
			document.body.scrollTop > 200 ||
			document.documentElement.scrollTop > 200
		) {
			if (!isShow) {
				btn.classList.add("load");
				isShow = !0;
			}
		} else if (isShow) {
			btn.classList.remove("load");
			isShow = !1;
		}
	};
	const handleClick = () => {
		lock = !0;
		btn.classList.add("ani-leave");
		window.scrollTo({ top: 0, behavior: "smooth" });
		setTimeout(() => {
			btn.classList.remove("ani-leave");
			btn.classList.add("leaved");
		}, 390);
		setTimeout(() => btn.classList.add("ending"), 120);
		setTimeout(() => btn.classList.remove("load"), 1500);
		setTimeout(() => {
			lock = !1;
			isShow = !1;
			btn.classList.remove("leaved", "ending");
			handleScroll();
		}, 2000);
	};
	window.addEventListener("scroll", handleScroll);
	btn.addEventListener("click", handleClick);
})();
