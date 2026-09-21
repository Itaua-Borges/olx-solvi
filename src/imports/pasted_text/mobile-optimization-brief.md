Make the EXISTING Sotero Conecta application fully optimized for MOBILE ONLY.

IMPORTANT:
This task is EXCLUSIVELY about the mobile experience.

DO NOT redesign the desktop version.
DO NOT change the desktop layout, desktop spacing, desktop navigation or desktop visual identity.
DO NOT remove existing features.
DO NOT rebuild the application from scratch.
DO NOT create duplicate pages or duplicate components.

Keep the existing Sotero Conecta design, colors, typography, icons, data, navigation and functionality.

The goal is to make the current application feel like a professionally designed mobile app instead of a desktop website compressed into a phone screen.

TARGET DEVICES:
Optimize for:
- 320px
- 360px
- 375px
- 390px
- 430px

MOBILE SIDEBAR:
- Convert the existing sidebar into a mobile off-canvas drawer.
- Sidebar must be hidden by default on mobile.
- Add a hamburger/menu button in the mobile top bar.
- When opened, sidebar slides in from the left.
- Sidebar width around 260px.
- Sidebar must appear above the page content.
- Add a semi-transparent dark overlay over the rest of the screen.
- Tapping the overlay closes the sidebar.
- Add a clear X close button.
- When a navigation item is selected, close the sidebar automatically.
- Never allow the sidebar to squeeze the page content horizontally.

MOBILE TOP BAR:
Create a dedicated mobile behavior while preserving the desktop TopBar.

Mobile layout should contain:
[Menu] [Search] [Notifications] [Avatar]

Requirements:
- Menu button on the left.
- Search field takes the available remaining width.
- Notification button remains visible.
- Show only the user avatar, not the full name.
- Hide the UVS badge on mobile.
- Reduce horizontal padding.
- Prevent overflow.
- Never allow the search field, icons or profile button to overlap.

MOBILE PAGE LAYOUT:
- Content must use the full viewport width.
- Use approximately 16px horizontal page padding.
- Remove unnecessary large desktop spacing.
- Use vertical layouts instead of forcing desktop columns.
- Never create horizontal scrolling.

DASHBOARD:
- Convert large multi-column desktop grids into mobile layouts.
- Use one column for large cards.
- Use two columns only for small statistic cards when they still fit comfortably.
- Cards must have readable text.
- Buttons must remain easy to tap.
- Keep the current content and visual identity.

SEARCH:
- Search results must become a single-column mobile layout.
- Filters should be accessible through a button.
- Open filters in a bottom sheet, drawer or modal instead of keeping them permanently beside the results.
- Product cards must fit completely inside the screen.
- Long product names must wrap.
- Images must remain proportional.

CREATE ANNOUNCEMENT:
This page must be completely comfortable on mobile.

Stack all fields vertically:
- Product name
- Product code
- Reference
- Category
- Quantity
- UVS
- Condition
- Transaction type
- Price
- Description
- Photo
- Location
- Contact preference

Requirements:
- Inputs use almost the entire available width.
- Labels remain above inputs.
- Buttons should be large enough for touch.
- Avoid tiny text.
- Avoid two narrow form fields next to each other unless absolutely necessary.

ITEM DETAILS:
- Product image should become responsive and fit the screen.
- Product information should become a vertical layout.
- Action buttons should use full width or comfortable stacked buttons.
- Keep "I am interested" and "Chat with owner" highly visible.
- Do not allow text or buttons to overflow.

CHAT:
The existing chat layout must NOT show two narrow columns on mobile.

Desktop:
Conversation list + chat area side by side.

Mobile:
Show conversation list first.
When a conversation is selected, open the chat as a full-width mobile view.
Provide an obvious back button to return to the conversation list.

MY ANNOUNCEMENTS:
- Use a single-column layout on mobile.
- Cards should be full width.
- Actions should wrap or stack cleanly.
- Status badges should remain readable.

NOTIFICATIONS:
- Notifications should use full available width.
- Avoid excessive horizontal padding.
- Notification content must wrap naturally.

PROFILE:
- Stack profile information vertically.
- Buttons and settings should be full width where appropriate.
- Avoid desktop-style multi-column sections on mobile.

RESPONSIVE CSS / TAILWIND:
Use responsive classes instead of fixed desktop dimensions.

Examples:
p-6 → p-4 md:p-6

px-6 → px-3 md:px-6

grid-cols-4 → grid-cols-2 md:grid-cols-4

grid-cols-3 → grid-cols-1 md:grid-cols-3

grid-cols-2 → grid-cols-1 md:grid-cols-2

flex-row → flex-col md:flex-row

w-72 → w-full md:w-72

Do not blindly apply these examples globally. Check each component and preserve layouts that are already appropriate.

FIXED WIDTHS:
Find and remove or adapt fixed widths that cause overflow on mobile, especially:
- w-64
- w-72
- min-w-*
- fixed widths
- large horizontal padding
- fixed grid columns

Images must use responsive sizing.

MOBILE TYPOGRAPHY:
- Keep body text readable.
- Do not shrink text excessively just to fit content.
- Product names, labels and buttons must remain readable.
- Headings may scale down slightly on mobile.

TOUCH INTERACTION:
- Buttons should have comfortable touch targets.
- Avoid buttons being too close together.
- Preserve hover effects for desktop but do not rely on hover for mobile functionality.

OVERFLOW:
The entire application must have:
- no horizontal scrolling
- no clipped cards
- no overlapping buttons
- no text cut off
- no fixed desktop components forcing the page wider than the viewport

IMPORTANT FINAL RULE:
Only change behavior at mobile breakpoints.
The existing desktop design should remain visually the same.

Do a complete mobile responsive pass across ALL existing pages and components, not just the dashboard.

Before finishing, verify the application visually at:
320px, 360px, 375px, 390px and 430px widths.

The final result should feel like a real corporate mobile application for Sotero Conecta, not a desktop website squeezed into a phone.