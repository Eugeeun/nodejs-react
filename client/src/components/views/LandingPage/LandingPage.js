import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';

import './css/style.css';

import Navbar from './LandingPageComponent/Navbar';
import Home from './LandingPageComponent/Home';
import About from './LandingPageComponent/About';
import Skills from './LandingPageComponent/Skills';
import Works from './LandingPageComponent/Works';
import Contact from './LandingPageComponent/Contact';
import ArrowUp from './LandingPageComponent/ArrowUp';

function LandingPage() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // 이 주소로 가서 뭔가 얻어와라
  //   axios.get('/api').then((response) => console.log(response.data));
  // }, []);

  useEffect(() => {
    const navbar = document.querySelector('#navbar'); // #navbar선택
    const navbarHeight = navbar.getBoundingClientRect().height; // #navbar의 박스 높이 할당

    document.addEventListener('scroll', () => {
      // 스크롤 될 때 이 함수를 실행해줘
      // console.log(`navbarHeight: ${navbarHeight}`);
      if (window.scrollY > navbarHeight) {
        // 스크롤된 길이가 #navbar 박스 높이보다 커지면
        navbar.classList.add('navbar--dark'); // navbar--dark 클래스를 추가해줘
      } else {
        // 스크롤된 길이가 #navbar 박스 높이보다 작아지면
        navbar.classList.remove('navbar--dark'); // navbar--dark 클래스를 제거해줘
      }
    });
  });

  useEffect(() => {
    const navbarMenu = document.querySelector('.navbar__menu'); // .navbar__menu를 선택
    navbarMenu.addEventListener('click', (event) => {
      // .nvabar__menu가 클릭이 될 때 이 함수를 실행해줘
      const target = event.target; // 클릭되고 있는 타깃
      const link = target.dataset.link; // 타깃의 data-link
      if (!link) return;
      // 링크가 없다면 early return
      // else console.log(event.target.dataset.link); // 그냥 찍어보는 거임

      // console.log(target);
      navbarMenu.classList.remove('open'); // .navbar__Menu의 클래스 중에 open을 제거해줘
      scrollIntoView(link); // 설정된 링크로 이동하는 함수
    });

    const navbarToggleBtn = document.querySelector('.navbar__toggle-btn'); // .navbar__toggle-btn를 선택
    navbarToggleBtn.addEventListener('click', () => {
      // .navbar__toggle-btn가 클릭이 되면 이 함수를 실행해줘
      navbarMenu.classList.toggle('open'); // .navbar__toggle-btn의 클래스 중에 open을 토글해줘
      // console.log(navbarMenu.classList);
    });

    // // Scrolling to contact when click 'contact me'
    // const contact = document.querySelector('.home__contact'); // .home__contact을 선택
    // contact.addEventListener('click', () => {
    //   // 클릭이 되면 이 함수를 실행해줘
    //   scrollIntoView('#contact'); // #contact이 있는 html로 이동해줘
    // });

    // Make home slowly fade to transparent as the window scrolls down
    const home = document.querySelector('.home__container'); // .home__container을 선택
    const homeHeight = home.getBoundingClientRect().height; // .home__container의 높이를 할당
    document.addEventListener('scroll', () => {
      // 스크롤 되면 이 함수를 실행해줘
      // console.log(1 - window.scrollY / homeHeight); // 알고리즘을 만들 때 내가 생각한 것이 맞는지 증명하면서 만들기
      home.style.opacity = 1 - window.scrollY / homeHeight;
      // .home__container의 박스의 투명도가 스크롤이 될 때마다 더 투명해지게 설정
    });

    // Show "arrow up" button when scrolling down
    const toTopBtn = document.querySelector('.toTopBtn'); // .toTopBtn을 선택
    document.addEventListener('scroll', () => {
      // 스크롤이 될 때 이 함수를 실행해줘
      if (window.scrollY > homeHeight / 2) toTopBtn.classList.add('visible');
      // .home__container의 절반 높이만큼 스크롤 되면 .toTopBtn에 visible 클래스를 추가해줘 => 보이게됨
      else toTopBtn.classList.remove('visible'); // 다시 작아지면 visible 클래스를 제거해줘
    });

    // when button's clicked locate to top
    toTopBtn.addEventListener('click', () => {
      // .toTopBtn이 클릭되면 이 함수를 실행해줘
      scrollIntoView('#home'); // #home으로 이동해줘
    });

    const sectionIds = ['#home', '#about', '#skills', '#work', '#contact']; // 일단 문자열로 모두 저장
    const sections = sectionIds.map((id) => document.querySelector(id));
    // 모든 요소들을 sections 라는 배열에 할당

    const navItems = sectionIds.map((id) =>
      document.querySelector(`[data-link="${id}"]`)
    );
    // 동일한 내비게이션 메뉴아이템 요소들을 배열로 할당
    // console.log(sections);
    // console.log(navItems);

    let selectedNavIdx = 0; // 선택된 인덱스
    let selectedNavItem = navItems[0]; // 선택된 아이템
    function selectNavItem(selected) {
      selectedNavItem.classList.remove('active'); // 이전을 지워주고
      selectedNavItem = selected; // 새롭게 할당하고
      selectedNavItem.classList.add('active'); // 추가해줌
    }

    // 선택된 메뉴로 스크롤 시켜주는 함수
    function scrollIntoView(selector) {
      const scrollTo = document.querySelector(selector); // selector선택
      scrollTo.scrollIntoView({ behavior: 'smooth' }); // 스무스하게 이동
      selectNavItem(navItems[sectionIds.indexOf(selector)]);
      // selector를 가지고 있는 navItems를 selectedNavItem에 할당
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        // 여기서 navbar__menu를 활성화 시켜주면 됨
        // console.log(entry.target);
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
          const index = sectionIds.indexOf(`#${entry.target.id}`);
          // console.log(index, entry.target.id);

          // 스크롤링이 아래로 되어서 페이지가 올라옴
          if (entry.boundingClientRect.y < 0) {
            selectedNavIdx = index + 1; // 다음 것을 가리킴
          } else {
            selectedNavIdx = index - 1; // 이전 것을 가리킴
          }
        }
      });
    };
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    // 이제부터 관찰할거야

    sections.forEach((section) => observer.observe(section));

    window.addEventListener('wheel', () => {
      if (window.scrollY === 0) {
        selectedNavIdx = 0;
      } else if (
        Math.round(window.scrollY + window.innerHeight) >=
        document.body.clientHeight
      ) {
        selectedNavIdx = navItems.length - 1;
      }
      selectNavItem(navItems[selectedNavIdx]);
    });
  });

  useEffect(() => {
    // do filtering when btn is clicked
    const workBtnContainer = document.querySelector('.work__categories'); // .work__categories선택
    const projectContainer = document.querySelector('.work__projects'); // .work__projects선택
    const projects = document.querySelectorAll('.project'); // .project를 가진 요소 모두 선택
    workBtnContainer.addEventListener('click', (event) => {
      // .work__categories가 클릭이 되면
      const filter =
        event.target.dataset.filter || event.target.parentNode.dataset.filter;
      // 클릭한 곳에 데이터가 들어있으면 그것을 쓰고 없으면 부모노드로 가서 가져옴
      // console.log(filter);

      if (!filter) return; // filter가 들어있지 않으면 리턴

      // Remove selection from the previous item and select the new one
      const active = document.querySelector('.category__btn.selected'); // .category__btn의.selected 선택
      active.classList.remove('selected'); // selected클래스를 제거
      const target = // target에는 항상 버튼만 할당됨
        event.target.nodeName === 'BUTTON'
          ? event.target
          : event.target.parentNode;
      // 버튼이면 그대로 할당하고 버튼이 아니면 부모노드(이게 버튼)을 할당함
      target.classList.add('selected'); // selected클래스 추가

      projectContainer.classList.add('ani-out'); // .work__projects에 ani-out 클래스 추가
      setTimeout(() => {
        // 시간지연
        projects.forEach((project) => {
          // projects를 빙글빙글 돌면서
          // console.log(project.dataset.type);
          if (filter === 'all' || filter === project.dataset.type) {
            // filter가 all 이거나 클릭된 project의 data-type과 같으면
            project.classList.remove('invisible'); // invisible클래스를 제거헤줘 => 보이게 해줘
          } else {
            // 같지 않으면
            project.classList.add('invisible'); // invisible클래스를 추가해줘 => 안보이게 해줘
          }
        });
        // 필터링을 수행하고 이제 다시 나타나야 됨
        projectContainer.classList.remove('ani-out');
        // 제거해줌
        // 그래서 필터링이 안된 채로 사라지고 필터링이 된 채로 나타남!
      }, 300); // 이 코드를 0.3초 후에 실행해줘
      // console.log(filter);
    });
  });

  return (
    <div
    // style={{
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   width: '100%',
    //   height: '100vh',
    // }}
    >
      {/* <h2>시작페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button> */}
      <Navbar></Navbar>
      <Home></Home>
      <About></About>
      <Skills></Skills>
      <Works></Works>
      <Contact></Contact>
      <ArrowUp></ArrowUp>
    </div>
  );
}

export default Auth(LandingPage, null);
