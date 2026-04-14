const { Client } = require('@notionhq/client');
require('dotenv').config();
const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function getPortfolioBlocks() {
  const portfolioPageId = '341d597e-f707-8135-a482-f5bf0486cf30';
  try {
    const page = await notion.pages.retrieve({ page_id: portfolioPageId });
    console.log('Portfolio Page Title:', JSON.stringify(page.properties.title || page.properties.Name || page.properties.Title));
    
    const blocks = await notion.blocks.children.list({ block_id: portfolioPageId });
    console.log('Portfolio Page Blocks Count:', blocks.results.length);
    console.log('Portfolio Page Last 3 Blocks:', JSON.stringify(blocks.results.slice(-3).map(b => {
      let content = '';
      if (b[b.type]?.rich_text?.[0]?.plain_text) {
        content = b[b.type].rich_text[0].plain_text;
      } else if (b.type === 'child_page') {
        content = `Child Page: ${b.child_page.title}`;
      } else if (b.type === 'child_database') {
        content = `Child DB: ${b.child_database.title}`;
      }
      return {
        id: b.id,
        type: b.type,
        content: content
      };
    }), null, 2));
  } catch (err) {
    console.error(err);
  }
}
getPortfolioBlocks();
