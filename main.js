const addBtn = document.querySelector('.fa-plus'); // 추가 버튼 (모달 열기)
const modal = document.querySelector('.modal'); // 모달 요소
const closeModal = document.querySelector('#closeModal'); // 닫기 버튼
const addTaskBtn = document.querySelector('#addTaskBtn'); // 할 일 추가 버튼
const items = document.querySelector('.items'); // 할 일 목록 (ul)
const searchInput = document.querySelector('.search_input'); // 검색창

// 모달 열기 (입력창 자동 포커스)
addBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    document.querySelector('#taskTitle').focus();
});

// 모달 닫기 (닫기 버튼 클릭)
closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// 모달 바깥 클릭 시 닫기
modal.addEventListener('click', (e) => {
    if (e.target === modal) { // 모달 배경 클릭한 경우
        modal.classList.add('hidden');
    }
});

// li 요소 생성 함수
function createItem(title, startDate, endDate, priority, category) {
    const itemRow = document.createElement('li');
    itemRow.className = 'item';

    let details = ''; // 추가 정보 문자열

    if (startDate && endDate) details += ` (${startDate} ~ ${endDate})`;
    if (category) details += ` [${category}]`;
    if (priority) details += ` ⭐${priority}`;

    itemRow.innerHTML = `
        <span>${title}${details}</span>
        <i class="fa-solid fa-check"></i>
        <i class="fa-solid fa-trash"></i>`;

    // 체크 버튼 클릭 시 완료 표시
    itemRow.querySelector('.fa-check').addEventListener('click', () => {
        itemRow.classList.toggle('item_done');
    });

    // 삭제 버튼 클릭 시 제거
    itemRow.querySelector('.fa-trash').addEventListener('click', () => {
        itemRow.remove();
    });

    // 스크롤 이동
    requestAnimationFrame(() => itemRow.scrollIntoView({ block: 'center' }));

    return itemRow;
}

// 추가 함수 (모달에서 입력한 값으로 추가)
addTaskBtn.addEventListener('click', () => {
    const title = document.querySelector('#taskTitle').value.trim();
    const startDate = document.querySelector('#startDate').value;
    const endDate = document.querySelector('#endDate').value;
    const priority = document.querySelector('#priority').value;
    const category = document.querySelector('#category').value.trim();

    if (!title) {
        alert('제목을 입력해주세요.');
        return;
    }

    // 할 일 목록에 추가
    items.appendChild(createItem(title, startDate, endDate, priority, category));

    // 모달 닫기 및 입력값 초기화
    modal.classList.add('hidden');
    document.querySelector('#taskTitle').value = '';
    document.querySelector('#startDate').value = '';
    document.querySelector('#endDate').value = '';
    document.querySelector('#priority').value = '보통';
    document.querySelector('#category').value = '';
});

// Enter 키로 할 일 추가 기능 추가
document.querySelector('.modal_content').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click(); // 추가 버튼 클릭 이벤트 실행
    }
});

// 검색 기능
searchInput.addEventListener('keyup', () => {
    const filter = searchInput.value.toLowerCase(); // 입력된 검색어 (소문자 변환)
    const itemsList = document.querySelectorAll('.item'); // 모든 리스트 아이템

    itemsList.forEach(item => {
        const text = item.querySelector('span').textContent.toLowerCase(); // 할 일 텍스트
        item.style.display = text.includes(filter) ? 'flex' : 'none'; // 검색어 포함 여부에 따라 표시
    });
});