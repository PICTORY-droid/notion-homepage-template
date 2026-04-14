const { Client } = require('@notionhq/client');
require('dotenv').config();
const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function updateContactPage() {
  const contactPageId = '341d597e-f707-8151-8a5a-ee6f5ab9e25e';
  
  try {
    // 1. Get existing blocks
    const response = await notion.blocks.children.list({ block_id: contactPageId });
    const existingBlocks = response.results;

    // 2. Delete existing blocks (sequentially to avoid race conditions/rate limits)
    console.log(`Deleting ${existingBlocks.length} blocks...`);
    for (const block of existingBlocks) {
      await notion.blocks.delete({ block_id: block.id });
    }
    console.log('Existing blocks deleted.');

    // 3. Append new blocks
    const newBlocks = [
      { type: 'heading_2', heading_2: { rich_text: [{ text: { content: 'Contact' } }] } },
      { type: 'paragraph', paragraph: { rich_text: [{ text: { content: '방문자가 문의를 남길 수 있는 페이지입니다. 아래 가이드를 따라 폼을 설정해주세요.' } }] } },
      { type: 'divider', divider: {} },
      { type: 'heading_3', heading_3: { rich_text: [{ text: { content: '📋 Tally Form 설정 가이드' } }] } },
      { type: 'paragraph', paragraph: { rich_text: [{ text: { content: 'Tally는 무료로 사용할 수 있는 폼 서비스예요. 아래 순서대로 따라하면 10분 안에 완성돼요!' } }] } },
      { type: 'divider', divider: {} },
      { type: 'heading_3', heading_3: { rich_text: [{ text: { content: 'STEP 1. Tally 가입하기' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'tally.so 접속' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '오른쪽 위 Sign up 클릭' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Google 계정으로 무료 가입' } }] } },
      { type: 'divider', divider: {} },
      { type: 'heading_3', heading_3: { rich_text: [{ text: { content: 'STEP 2. 폼 만들기' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '로그인 후 + New form 클릭' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Form title에 \'Contact 이름\' 입력 (예: Contact PICTORY)' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Press Enter to start from scratch 클릭' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '/ 입력 → Short answer 선택 → 질문에 \'이름\' 입력' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '/ 입력 → Email 선택 → 질문에 \'이메일\' 입력' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '/ 입력 → Long answer 선택 → 질문에 \'메시지\' 입력' } }] } },
      { type: 'divider', divider: {} },
      { type: 'heading_3', heading_3: { rich_text: [{ text: { content: 'STEP 3. 폼 발행하기' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '오른쪽 위 Publish 버튼 클릭' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Share 탭 클릭' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '링크 복사 (https://tally.so/r/xxxxx 형태)' } }] } },
      { type: 'divider', divider: {} },
      { type: 'heading_3', heading_3: { rich_text: [{ text: { content: 'STEP 4. 노션에 임베드하기' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '이 페이지에서 아래 노란색 callout 블록 삭제' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '빈 줄에 /embed 입력' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Embed 선택' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '복사한 Tally Form 링크 붙여넣기 → Enter' } }] } },
      { type: 'divider', divider: {} },
      { type: 'heading_3', heading_3: { rich_text: [{ text: { content: 'STEP 5. 이메일 알림 설정하기' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Tally → Contact 폼 클릭 → Settings 탭' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: 'Self email notifications 토글 켜기' } }] } },
      { type: 'numbered_list_item', numbered_list_item: { rich_text: [{ text: { content: '이제 누군가 폼을 제출하면 이메일로 알림이 와요!' } }] } },
      { type: 'divider', divider: {} },
      { type: 'callout', callout: { 
          rich_text: [{ text: { content: '👇 설정 완료 후 이 가이드 블록들을 모두 삭제하고 여기에 Tally Form을 임베드하세요!' } }],
          icon: { emoji: '👇' },
          color: 'yellow_background'
        } 
      }
    ];

    await notion.blocks.children.append({
      block_id: contactPageId,
      children: newBlocks
    });
    console.log('New content appended to Contact page.');

  } catch (error) {
    console.error('Error updating Contact page:', error);
  }
}

updateContactPage();
