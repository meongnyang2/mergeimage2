let currentMenu = 1; // 1: 순서대로 합치기, 2: 자동 합치기

// 메뉴 전환 버튼 클릭 이벤트
document.getElementById('mergeButton1').addEventListener('click', () => {
    currentMenu = 1;
    resetPage();
});

document.getElementById('mergeButton2').addEventListener('click', () => {
    currentMenu = 2;
    resetPage();
});

function resetPage() {
    document.getElementById('preview').style.display = 'none';
    document.getElementById('mergedImage').src = '';
    document.getElementById('widthInput').value = '';
    document.getElementById('fileUpload1').style.display = currentMenu === 1 ? 'block' : 'none';
}

document.getElementById('mergeImages').addEventListener('click', () => {
    const width = parseInt(document.getElementById('widthInput').value);
    if (width < 100 || width > 1000 || isNaN(width)) {
        alert("가로 사이즈는 100~1000px 사이여야 합니다.");
        return;
    }

    let files = [];
    if (currentMenu === 1) {
        files = getFilesFromInput();
    } else if (currentMenu === 2) {
        files = getFilesFromDrag();
    }

    if (files.length > 0) {
        mergeImages(files, width);
    } else {
        alert("이미지를 업로드해주세요.");
    }
});

function getFilesFromInput() {
    let files = [];
    for (let i = 1; i <= 10; i++) {
        const fileInput = document.getElementById(`file${i}`);
        if (fileInput.files.length > 0) {
            files.push(fileInput.files[0]);
        }
    }
    return files;
}

function getFilesFromDrag() {
    const files = [];
    // 드래그 앤 드롭을 처리할 코드 추가 필요
    return files;
}

function mergeImages(files, width) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    let totalHeight = 0;
    const images = [];

    files.forEach((file, index) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        images.push(img);
        
        img.onload = () => {
            totalHeight += img.height;
            if (index === files.length - 1) {
                canvas.width = width;
                canvas.height = totalHeight;

                let currentY = 0;
                images.forEach(img => {
                    ctx.drawImage(img, 0, currentY, width, img.height * (width / img.width));
                    currentY += img.height * (width / img.width);
                });

                const finalImage = canvas.toDataURL('image/png');
                document.getElementById('mergedImage').src = finalImage;
                document.getElementById('preview').style.display = 'block';
            }
        };
    });
}
