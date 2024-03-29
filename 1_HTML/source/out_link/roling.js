const bannerList = document.querySelector('.banner_list');
    const bannerItems = document.querySelectorAll('.banner');
    const numBanners = bannerItems.length; // 총 배너의 갯수를 변수에 담기

    // 선택된 배너의들을 복제해서 뒤에 이어 붙이기 
    for (let i = 0; i < numBanners; i++) {
      bannerList.appendChild(bannerItems[i].cloneNode(true));
    }

    // 배너 하나의 너비를 계산한다.
    const bannerWidth = bannerItems[0].offsetWidth;
    // 배너 리스트의 너비를 설정한다.
    bannerList.style.width = `${bannerWidth * numBanners * 2 + 10 * (numBanners * 2 - 1)}px`;

    // 현재 배너 위치와 마지막으로 애니메이션을 실행한 시간을 저장하는 변수를 초기화
    let currentPos = 0;
    let lastTime = 0;

    // 애니메이션을 실행하는 함수를 정의
    function animate(timestamp) {
      // 마지막으로 애니메이션을 실행한 시간과 현재 시간 사이의 차이를 계산
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      // 배너 리스트를 이동시킬 거리를 계산
      currentPos -= (bannerWidth + 10) * delta / 1000;
      // 만약 배너 리스트가 전부 왼쪽으로 이동했다면, 처음 위치로 이동
      if (currentPos <= -(bannerWidth + 10) * numBanners) {
        currentPos = 0;
      }
      // 배너 리스트를 이동
      bannerList.style.transform = `translateX(${currentPos}px)`;

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);