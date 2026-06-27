# Design System: Ecme v1.3.8

**RÈGLE ABSOLUE : Ne jamais inventer de composants. Tous les composants, layouts, styles et assets existent déjà dans le système de design Ecme v1.3.8.**

## Stack technique

- React + TypeScript
- Tailwind CSS (avec CSS variables personnalisées)
- Vite
- Font : Inter

## Structure des composants

### UI Primitives — `@/components/ui`

Importer depuis `@/components/ui` :

```ts
import {
  Alert, Avatar, Badge, Button, Calendar, Card, Carousel,
  Checkbox, ConfigProvider, DatePicker, Dialog, Drawer,
  Dropdown, Form, FormItem, FormContainer, Input, InputGroup,
  Menu, MenuItem, Notification, Pagination, Progress, Radio,
  RangeCalendar, ScrollBar, Segment, Select, Skeleton, Slider,
  Spinner, Steps, Switcher, Table, Tabs, Tag, TimeInput,
  Timeline, toast, Tooltip, Upload
} from '@/components/ui'
```

**Catégories disponibles :**

| Catégorie | Composants |
|---|---|
| **Common** | Button, Grid, Icons, Typography |
| **Data Display** | Avatar, Badge, Calendar, Cards, Carousel, Table, Tag, Timeline, Tooltip, Tree |
| **Feedback** | Alert, Dialog, Drawer, Progress, Skeleton, Spinner, Toast |
| **Forms** | Checkbox, DatePicker, FormControl, Input, InputGroup, Radio, Segment, Select, Slider, Switcher, TimeInput, Upload |
| **Navigation** | Dropdown, Menu, Pagination, Steps, Tabs |
| **Graph** | Charts, Maps |

### Composants Partagés — `@/components/shared`

```ts
import {
  AbbreviateNumber, ActionLink, AdaptiveCard, Affix,
  AuthorityCheck, AutoComplete, CalendarView, Chart,
  ConfirmDialog, Container, CustomFormatInput, DataTable,
  DebouceInput, DoubleSidedImage, EllipsisButton, GanttChart,
  GrowShrinkValue, IconText, ImageGallery, Loading, Masonry,
  NavToggle, NumericInput, OtpInput, PasswordInput,
  PatternInput, RegionMap, RichTextEditor, StickyFooter,
  SyntaxHighlighter, ToggleDrawer, UsersAvatarGroup
} from '@/components/shared'
```

### Composants Template / Layout — `@/components/template`

```ts
import {
  BottomStickyBar, Footer, FrameLessGap, Header, HeaderLogo,
  HorizontalMenuContent, HorizontalNav, LanguageSelector,
  LayoutBase, Logo, MobileNav, PageContainer, Search,
  SideNav, SideNavToggle, SidePanel, StackedSideNav,
  Theme, ThemeConfigurator, UserProfileDropdown,
  VerticalMenuContent
} from '@/components/template'
```

## Design Tokens (CSS Variables)

### Couleurs

```css
/* Brand */
--primary: #2a85ff
--primary-deep: #0069f6
--primary-mild: #4996ff
--primary-subtle: #2a85ff1a

/* Statuts */
--error: #ff6a55
--error-subtle: #ff6a551a
--success: #10b981
--success-subtle: #05eb7624
--info: #2a85ff
--info-subtle: #2a85ff1a
--warning: #f59e0b
--warning-subtle: #ffd40045

/* Neutres */
--neutral: #ffffff
--gray-50 à --gray-950
```

Classes Tailwind correspondantes : `text-primary`, `bg-primary`, `text-error`, `bg-success`, etc.

### Typographie

- `h1 / .h1` → `text-4xl font-bold text-gray-900`
- `h2 / .h2` → `text-3xl font-bold text-gray-900`
- `h3 / .h3` → `text-2xl font-bold text-gray-900`
- `h4 / .h4` → `text-xl font-bold text-gray-900`
- `h5 / .h5` → `text-lg font-bold text-gray-900`
- `h6 / .h6` → `text-base font-semibold text-gray-900`
- `.heading-text` → `text-gray-900 dark:text-gray-100`
- Body : `text-sm text-gray-500 dark:text-gray-400`

### Breakpoints

| Token | Valeur |
|---|---|
| `xs` | 576px |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

### Dark Mode

Classe `.dark` sur `<html>`. Utiliser `dark:` prefix Tailwind pour toutes les variantes sombres.

## Dépendances clés (déjà intégrées)

| Package | Usage |
|---|---|
| `@tanstack/react-table` | Tableaux avancés |
| `react-apexcharts` | Graphiques |
| `react-hook-form` + `zod` | Formulaires + validation |
| `zustand` | State management |
| `framer-motion` | Animations |
| `dayjs` | Dates |
| `react-icons` | Icônes |
| `axios` | HTTP client |
| `@hello-pangea/dnd` | Drag & drop |
| `@tiptap/react` | Éditeur de texte riche |
| `react-i18next` | Internationalisation |
| `tailwind-merge` | Fusion classes Tailwind |
| `@tanstack/react-virtual` | Virtualisation de listes |
| `@fullcalendar/react` | Calendrier avancé |
| `react-select` | Select avancé |
| `simplebar-react` | Scrollbar personnalisée |
| `swr` | Data fetching / cache |

## Dashboards disponibles

- `AnalyticDashboard`
- `EcommerceDashboard`
- `MarketingDashboard`
- `ProjectDashboard`

## Règles de développement

1. **Toujours** utiliser les composants Ecme existants — jamais créer un composant UI from scratch.
2. **Toujours** utiliser les CSS variables / tokens Tailwind définis ci-dessus pour les couleurs.
3. **Toujours** implémenter le dark mode avec le prefix `dark:`.
4. Utiliser `tailwind-merge` (`twMerge`) pour fusionner des classes conditionnelles.
5. Pour les icônes, utiliser `react-icons` (déjà intégré).
6. Pour les formulaires, utiliser `react-hook-form` + `zod` pour la validation.
7. Pour les requêtes API, utiliser `axios` avec `swr` pour le cache.
8. Pour les animations, utiliser `framer-motion`.
