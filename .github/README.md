## Developer Workflow Prompts

Reusable prompts สำหรับ Developer ใช้ร่วมกับ GitHub Copilot Agent Mode

| Prompt | คำอธิบาย |
|--------|----------|
| `/jira-list-story` | List Stories ที่ assign ให้ตัวเองพร้อม key details |
| `/jira-create-confluence` | สร้าง Confluence page จาก requirement |
| `/jira-create-epic` | สร้าง Epic ใน Jira |
| `/jira-create-story` | สร้าง Story ใน Jira |
| `/jira-implement-story` | Implement feature จาก Jira Story พร้อม AC checklist และอัพเดต status อัตโนมัติ |

### jira-implement-story workflow
1. Fetch Jira issue และแสดงรายละเอียด
2. ขอ confirm ก่อนดำเนินการ (**"ยืนยัน"**)
3. เปลี่ยน status → **In Progress**
4. สร้าง AC Checklist
5. Implement feature ทีละ AC
6. ตรวจสอบ ACs ทั้งหมด
7. เปลี่ยน status → **TO REVIEW**

## References

- [Reusable prompts](https://code.visualstudio.com/docs/copilot/copilot-tips-and-tricks#:~:text=Reusable%20prompts,a%20new%20React%20form%20component.)
- [Repository Instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)