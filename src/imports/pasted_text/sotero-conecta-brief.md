EDIT AND IMPROVE THE EXISTING PROJECT.

IMPORTANT:
DO NOT rebuild the application from scratch.
DO NOT replace the existing architecture unnecessarily.
DO NOT delete working features.
DO NOT create a second application.
DO NOT reset or redesign the entire project.

First inspect the existing application and understand its current structure, components, pages, navigation, state management and data flow.

Then implement the requested improvements directly into the existing project.

The goal is to evolve the current application into a polished, modern internal marketplace experience.

==================================================
PROJECT IDENTITY
==================================================

Application name:

SOTERO CONECTA

The product concept is based on the internal marketplace idea presented in the OLX Solví project:

Connect the unit that HAS a material with the unit that NEEDS that material.

The platform is intended for internal use by employees and authorized users.

This is NOT a public marketplace.

The application should feel familiar like modern platforms such as OLX, Airbnb and Mercado Livre, but adapted to a professional corporate environment.

==================================================
CORE BUSINESS CONCEPT
==================================================

The core workflow is:

REGISTER MATERIAL
→ SEARCH
→ INTEREST
→ REQUEST
→ CONCLUSION

There are two types of material availability:

SALE
LOAN

The original project concept describes:
- One unit registering a material that is currently unused.
- Other units searching for available materials.
- The interested unit requesting a purchase or loan.
- The units handling the final movement according to internal procedures.

Preserve this business logic.

==================================================
LANGUAGE
==================================================

All visible interface text must be in Brazilian Portuguese.

Use clear, natural and simple Portuguese.

Examples:

“Explorar”
“Pesquisar”
“Anunciar material”
“Materiais que preciso”
“Meus anúncios”
“Solicitações”
“Mensagens”
“Notificações”
“Meu perfil”

Do not leave user-facing interface labels in English.

==================================================
DESIGN DIRECTION
==================================================

Use:

CLEAN MARKETPLACE
CARD-BASED MINIMALIST DESIGN

The application should visually resemble a modern marketplace rather than a complex enterprise dashboard.

The interface should feel:

- Clean
- Modern
- Lightweight
- Professional
- Familiar
- Easy to understand
- Easy to use
- Visually attractive

The first-time user should understand the application without needing instructions.

The UI should prioritize visual clarity and low cognitive load.

==================================================
VISUAL STYLE
==================================================

Use a LIGHT interface as the primary visual direction.

Background:
- White
- Very light gray

Surfaces:
- White
- Soft gray where appropriate

Cards:
- White
- Rounded corners
- Subtle borders
- Very light shadows

Typography:
- Clear
- Modern
- Strong hierarchy
- Easy to scan

Do NOT make the application look cyberpunk or gaming-oriented.

Avoid:
- Excessive neon
- Excessive glow
- Heavy gradients
- Too many colors
- Excessive shadows
- Excessive animations
- Visually noisy backgrounds

The final result should look like a real corporate product that employees could use every day.

==================================================
COLOR SEMANTICS
==================================================

Use color mainly to communicate meaning.

SALE:
Blue

LOAN:
Green

Available:
Green or neutral success indicator

Pending:
Yellow/amber

Rejected:
Red

Completed:
Neutral/success

Do not use random colors.

Keep the palette restrained and consistent throughout the application.

==================================================
MAIN EXPLORATION EXPERIENCE
==================================================

The main screen should feel like a marketplace feed.

Top section:

Welcome / contextual header

Prominent search bar

Quick category chips

Then:

“Materiais disponíveis”

Show materials using card-based layouts.

The user should be able to immediately browse available materials.

==================================================
MATERIAL CARD DESIGN
==================================================

Every material should appear in a clean marketplace card.

Card structure:

[ LARGE PHOTO ]

Material name

Reference
Internal code

UVS / Unit

Quantity available

Condition

Transaction badge

Primary action

Example:

--------------------------------

[ MATERIAL IMAGE ]

Bomba hidráulica

Referência: BH-001
Código: 45872

01.01.03.000324 — Consórcio Bahia

2 disponíveis

[ EMPRÉSTIMO ]

[ Tenho interesse ]

--------------------------------

Prioritize:

1. Image
2. Material name
3. Sale / Loan status
4. Availability
5. UVS / Unit
6. Reference and code
7. Secondary information

Do not overcrowd cards.

==================================================
UVS / UNIT
==================================================

IMPORTANT:

UVS represents an INTERNAL COMPANY UNIT / OPERATION.

UVS is NOT simply a city.

Do NOT use random cities as UVS.

Never use examples such as:
- São Paulo
- Rio de Janeiro
- Belo Horizonte

The preferred display format is:

[INTERNAL UNIT CODE] — [UNIT NAME]

Example:

01.01.03.000324 — Consórcio Bahia

Another example:

01.XX.XX.XXXXXX — Consórcio Salvador

IMPORTANT:

These are examples of the expected format.

Do NOT claim example codes are official.
Do NOT invent official company codes.
Do NOT invent an official list of UVS.

The system must support configurable UVS records with:

- Internal unit code
- Unit name

UVS must be used consistently in:

- Material creation
- Material cards
- Material details
- Search filters
- My Announcements
- Materials I Need
- Requests
- Notifications

==================================================
SEARCH
==================================================

Create a prominent marketplace-style search bar.

Placeholder:

“Pesquise materiais, referências ou códigos...”

Search by:

- Material name
- Reference
- Internal code

Search should update results clearly and quickly.

==================================================
QUICK CATEGORY CHIPS
==================================================

Below the search bar, use horizontal category chips.

Examples:

Todos
Máquinas
Ferramentas
EPIs
Informática
Peças
Veículos
Outros

Chips must be:

- Rounded
- Compact
- Easy to tap
- Visually clear
- Horizontally scrollable on mobile

Selecting a chip should immediately filter the material list.

==================================================
FILTERS
==================================================

Create a simple filter experience.

Filters:

- UVS / Unidade
- Categoria
- Modalidade
- Estado
- Disponibilidade

Do not create complicated filter menus.

On desktop:
show a practical filter area.

On mobile:
use a “Filtros” button that opens a clean drawer or modal.

==================================================
ANNOUNCE MATERIAL
==================================================

Keep the existing announcement functionality, but improve its UX.

Create a SIMPLE 3-STEP WIZARD.

The goal is to make announcing a material fast and intuitive.

--------------------------------
STEP 1
FOTOS
--------------------------------

Title:

“Adicionar fotos”

Allow:

- Upload photos
- Multiple photos
- Main photo selection
- Preview
- Remove photo

The material image should be highly visible.

--------------------------------
STEP 2
INFORMAÇÕES
--------------------------------

Title:

“Informações do material”

Fields:

Nome do material
Referência
Código interno
Categoria
Quantidade
UVS / Unidade
Estado de conservação
Modalidade
Observações

Modalidade:

Venda
Empréstimo

--------------------------------
STEP 3
REVISÃO
--------------------------------

Title:

“Revisar anúncio”

Show a complete preview using the actual marketplace card design.

Primary button:

“Anunciar material”

When clicked:

- Validate required fields
- Save the material
- Create the announcement
- Make it available in Explore
- Make it searchable
- Add it to My Announcements

Then display:

“Material anunciado com sucesso!”

Use a toast or success confirmation.

==================================================
DATA PERSISTENCE
==================================================

The system must actually save created announcements and saved needs.

First, reuse the existing project's data/state architecture if one already exists.

Do NOT create a new backend unnecessarily.

If the current project does not have a persistent backend, use the safest available client-side persistence mechanism so data survives page refreshes, such as localStorage.

Do not fake successful saving while losing the data after refresh.

==================================================
MY ANNOUNCEMENTS
==================================================

Create a clean page:

“Meus anúncios”

Show the user's created materials.

Each item should display:

- Photo
- Material name
- Reference
- Code
- UVS / Unit
- Quantity
- Sale / Loan
- Status

Actions:

Editar
Excluir
Visualizar

Allow users to manage only their own announcements.

==================================================
MATERIALS I NEED
==================================================

Create a completely separate feature:

“Materiais que preciso”

IMPORTANT:

This is NOT an announcement.

Meaning:

“I NEED this material and want to be notified if someone makes it available.”

The user should be able to save a material need.

Fields:

Nome do material
Referência
Código interno, se conhecido
Categoria
Quantidade necessária
UVS / Unidade
Observações

Primary button:

“Salvar necessidade”

After saving:

“Necessidade salva com sucesso!”

==================================================
MY NEEDS
==================================================

Create a dedicated page:

“Minhas necessidades”

Each saved need should appear as a clean card.

Show:

- Material name
- Reference
- Internal code
- Quantity
- UVS / Unit
- Status
- Creation date

Statuses:

Procurando
Material encontrado
Em negociação
Resolvido

Actions:

Editar
Excluir
Marcar como resolvido

==================================================
AUTOMATIC MATCHING
==================================================

The system must connect:

MATERIALS AVAILABLE

with

MATERIALS I NEED

When a new material announcement is created, compare it against saved needs.

Potential matching fields:

- Material name
- Reference
- Internal code
- Category

If a reasonable match is found:

notify the user who saved the need.

Example:

Saved need:

“Bomba hidráulica”

New announcement:

“Bomba hidráulica disponível”

Notification:

“Encontramos um material que pode atender sua necessidade.”

Show:

- Material name
- Reference
- Internal code
- UVS / Unit
- Quantity
- Sale / Loan

Primary action:

“Ver material”

IMPORTANT:

Do not require identical text if reasonable matching can be made using reference, code, category or similar material names.

==================================================
RECOMMENDATIONS
==================================================

The Explore screen should have a section:

“Pode ser útil para você”

This section can show materials related to the user's saved needs.

If the user has no saved needs, show:

“Salve uma necessidade para receber sugestões de materiais.”

==================================================
MATERIAL DETAILS
==================================================

The material details page should feel like a modern marketplace product page.

Use:

Large primary image

Material name

Reference
Internal code

UVS / Unit

Quantity

Condition

Sale / Loan

Description

Responsible unit/user

Primary action:

“Tenho interesse”

After clicking:

Escolha uma opção:

“Solicitar compra”
“Solicitar empréstimo”

==================================================
REQUEST FLOW
==================================================

When a user requests a material, create a request.

Statuses:

Pendente
Em análise
Aprovada
Recusada
Concluída

The responsible user should be able to see:

- Requester
- Material
- Quantity
- Requester UVS / Unit
- Request type
- Date
- Status

==================================================
MESSAGES
==================================================

Keep the existing internal messaging functionality.

The requester and material owner can communicate about:

- Material details
- Quantity
- Conditions
- Pickup
- Delivery
- Internal negotiation

Keep all communication restricted to authorized users.

==================================================
MOBILE NAVIGATION
==================================================

On mobile, use a simple bottom navigation bar.

Only four primary actions:

Explorar
Pesquisar
Anunciar
Mensagens / Pedidos

The “Anunciar” button should be visually emphasized.

Example structure:

[ Explorar ] [ Pesquisar ] [ + ] [ Mensagens ]

The center “+” action should lead to:

“Anunciar material”

Secondary functionality such as:

- Meus anúncios
- Materiais que preciso
- Notificações
- Perfil

can remain accessible through profile/menu navigation.

==================================================
DESKTOP NAVIGATION
==================================================

On desktop, keep navigation clean and compact.

Primary areas:

Explorar
Pesquisar
Anunciar
Mensagens / Pedidos

Secondary:

Meus anúncios
Materiais que preciso
Notificações
Meu perfil

Do not create an oversized sidebar.

==================================================
DASHBOARD / HOME
==================================================

Do NOT turn the dashboard into a complicated analytics dashboard.

The home experience should prioritize finding and sharing materials.

Suggested hierarchy:

1. Welcome
2. Search
3. Categories
4. Recently added materials
5. Recommended materials
6. My needs
7. My announcements
8. Recent requests

Use statistics only where they provide useful context.

Avoid unnecessary charts.

==================================================
EMPTY STATES
==================================================

Create polished empty states.

No materials:

“Nenhum material encontrado”
“Tente alterar sua pesquisa ou filtros.”

No announcements:

“Você ainda não anunciou nenhum material.”
“Anuncie um material para disponibilizá-lo para outras unidades.”

No needs:

“Você ainda não salvou nenhuma necessidade.”
“Salve o que está procurando e avisaremos quando encontrarmos uma correspondência.”

No requests:

“Nenhuma solicitação ativa.”

==================================================
UI / UX DETAILS
==================================================

Improve the existing application visually and functionally.

Use:

- Consistent spacing
- Consistent border radius
- Consistent typography
- Strong hierarchy
- Clear button hierarchy
- Clear labels
- Useful icons
- Subtle hover states
- Selected states
- Toast notifications
- Loading states
- Error states
- Success states

Primary actions must always be visually obvious.

Do not use different visual patterns for the same type of action.

==================================================
RESPONSIVE DESIGN
==================================================

The entire application must work correctly on:

- Desktop
- Tablet
- Mobile

On mobile:

- Use bottom navigation
- Use one-column forms
- Use horizontally scrollable category chips
- Use large touch targets
- Use responsive marketplace cards
- Use filter drawer
- Keep buttons accessible
- Prevent horizontal overflow
- Preserve image quality
- Keep hierarchy clear

Do not simply shrink desktop layouts.

Adapt the interface specifically for mobile.

==================================================
ACCESSIBILITY
==================================================

Use:

- Strong contrast
- Readable font sizes
- Clear labels
- Adequate touch target sizes
- Clear form validation
- Clear error messages
- Clear success messages

==================================================
DESIGN CONSISTENCY
==================================================

Create a small consistent design system for the existing application.

Standardize:

- Cards
- Buttons
- Inputs
- Chips
- Badges
- Modals
- Toasts
- Typography
- Spacing
- Icons

Do not create slightly different versions of the same component on different pages.

Reuse the existing components whenever possible.

==================================================
IMPORTANT BUSINESS RULES
==================================================

1. This is an INTERNAL platform.

2. UVS means COMPANY UNIT / OPERATION.

3. UVS should use the format:

Internal code — Unit name

Example:

01.01.03.000324 — Consórcio Bahia

4. Do not invent official codes.

5. Do not use random cities as UVS.

6. “Anunciar material” means:
“I HAVE this material.”

7. “Materiais que preciso” means:
“I NEED this material.”

8. These two concepts must remain separate.

9. Sale and Loan are the two core transaction types.

10. Users should be able to save what they need.

11. Saved needs must remain saved.

12. New announcements should be compared with saved needs.

13. Matching needs should generate notifications.

14. Existing working functionality must not be removed.

==================================================
FINAL UX GOAL
==================================================

When someone opens Sotero Conecta for the first time, they should immediately understand:

WHAT CAN I FIND?

WHAT DO I NEED?

HOW DO I ANNOUNCE SOMETHING?

The application should feel as easy to use as a familiar marketplace application while maintaining the professionalism and internal nature of a corporate platform.

The final result should be:

Clean
Modern
Professional
Simple
Fast to understand
Visually attractive
Responsive
Consistent

Most importantly:

IMPROVE THE EXISTING PROJECT.

DO NOT REBUILD IT FROM SCRATCH.