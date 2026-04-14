const { Client } = require('@notionhq/client');
require('dotenv').config();
const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function addPortfolioGuide() {
  const portfolioPageId = '341d597e-f707-8135-a482-f5bf0486cf30';
  
  try {
    const newBlocks = [
      { type: 'divider', divider: {} },
      { type: 'heading_3', heading_3: { rich_text: [{ text: { content: '📖 Archive 사용 가이드' } }] } },
      { type: 'paragraph', paragraph: { rich_text: [{ text: { content: 'Archive는 작업물을 관리하는 데이터베이스예요. 아래 가이드를 따라 본인의 작업물로 교체해주세요.' } }] } },
      { type: 'divider', divider: {} },
      { type: 'heading_3', heading_3: { rich_text: [{ text: { content: 'STEP 1. 예시 데이터 삭제하기' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Archive DB 열기' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Project 01, Design 01 등 예시 항목들을 모두 선택' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Delete 키로 삭제' } }] } },
      { type: 'divider', divider: {} },
      { type: 'heading_3', heading_3: { rich_text: [{ text: { content: 'STEP 2. 본인 작업물 추가하기' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '+ 새 페이지 클릭' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '작업물 이름 입력 (예: 내 첫 번째 앱)' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Category 선택 (디자인, 개발, 음악 등)' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Link에 작업물 URL 입력 (노트폴리오, 깃허브, 유튜브 등)' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Date에 제작 날짜 입력' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Tools에 사용한 툴 선택 (Canva, GitHub 등)' } }] } },
      { type: 'divider', divider: {} },
      { type: 'heading_3', heading_3: { rich_text: [{ text: { content: 'STEP 3. 카테고리 커스터마이징' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Categories 페이지 열기' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '본인에게 맞는 카테고리로 이름 변경' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '예: 디자인 → Graphic Design, 음악 → Music Production' } }] } },
      { type: 'divider', divider: {} },
      { type: 'heading_3', heading_3: { rich_text: [{ text: { content: 'STEP 4. 툴킷 커스터마이징' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Toolkit 페이지 열기' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '본인이 쓰는 툴로 교체' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '예: Canva → Figma, Claude → ChatGPT' } }] } },
      { type: 'divider', divider: {} },
      { type: 'callout', callout: { 
          rich_text: [{ text: { content: '💡 작업물이 많을수록 포트폴리오가 풍성해져요. 완성된 것뿐만 아니라 진행 중인 작업도 추가해보세요!' } }],
          icon: { emoji: '💡' },
          color: 'yellow_background'
        } 
      }
    ];

    await notion.blocks.children.append({
      block_id: portfolioPageId,
      children: newBlocks
    });
    console.log('New guide blocks appended to Portfolio page.');

  } catch (error) {
    console.error('Error adding guide to Portfolio page:', error);
  }
}

addPortfolioGuide();
