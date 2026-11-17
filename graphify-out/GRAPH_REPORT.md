# Graph Report - Portfolio v5  (2026-11-17)

## Corpus Check
- 110 files · ~84,604 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 842 nodes · 1414 edges · 51 communities (48 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9e42606e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 48|Community 48]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 280 edges
2. `compilerOptions` - 22 edges
3. `compilerOptions` - 18 edges
4. `useAudio()` - 17 edges
5. `Button()` - 11 edges
6. `Afnan Workspace — Product & UX Suggestions` - 11 edges
7. `useHighScore()` - 9 edges
8. `5. UI/UX and accessibility issues` - 9 edges
9. `useTheme()` - 8 edges
10. `Afnan Workspace — Developer Portfolio` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Toaster()` --calls--> `useTheme()`  [INFERRED]
  src/components/ui/sonner.tsx → src/components/theme-provider.tsx
- `AccordionItem()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/accordion.tsx → src/lib/utils.ts
- `AccordionTrigger()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/accordion.tsx → src/lib/utils.ts
- `AccordionContent()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/accordion.tsx → src/lib/utils.ts
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts

## Import Cycles
- 3-file cycle: `src/App.tsx -> src/components/terminal/ArcadeWindow.tsx -> src/components/terminal/ArcadeLobby.tsx -> src/App.tsx`

## Communities (51 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (38): Language, LANGUAGES, Book, BOOK_LIBRARY, CEFR_LEVELS, CefrLevel, SPANISH_LEVEL_INDEX, SPANISH_PROGRESS (+30 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (39): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle(), Sidebar() (+31 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (34): cn(), Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), BreadcrumbEllipsis() (+26 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (32): Header(), HeaderProps, useClock(), useTemperature(), ModeToggle(), ResolvedTheme, Theme, THEME_VALUES (+24 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (41): dependencies, class-variance-authority, clsx, cmdk, embla-carousel-react, input-otp, lucide-react, next-themes (+33 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (24): compilerOptions, allowImportingTsExtensions, baseUrl, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+16 more)

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (15): Command(), CommandDialog(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator(), CommandShortcut() (+7 more)

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (19): cellCenter(), Dir, DIRS, GameState, Ghost, GHOST_DEFS, GHOST_POINTS, GhostKind (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 9 - "Community 9"
Cohesion: 0.18
Nodes (12): Item(), ItemActions(), ItemContent(), ItemDescription(), ItemFooter(), ItemGroup(), ItemHeader(), ItemMedia() (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.13
Nodes (14): AFNAN_FILES, ASSETS_FILES, CERTIFICATIONS, commandOutputs, FolderEntry, FORTUNES, PROJECTS_FILES, TERMINAL_COMMANDS (+6 more)

### Community 11 - "Community 11"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, registries, rsc (+9 more)

### Community 12 - "Community 12"
Cohesion: 0.11
Nodes (18): Afnan Workspace — Developer Portfolio, "Building practical applications, interactive experiences, and continuously improving through hands-on development.", Built-in Arcade, Connect With Me, Deployment, Develop, Getting Started, Highlights (+10 more)

### Community 13 - "Community 13"
Cohesion: 0.11
Nodes (16): EXPLORER_FOLDERS, FileEntry, EditorContent(), EditorContentProps, Explorer(), ExplorerProps, MarkdownRenderer(), renderInlineMarkdown() (+8 more)

### Community 14 - "Community 14"
Cohesion: 0.12
Nodes (11): Menubar(), MenubarCheckboxItem(), MenubarContent(), MenubarItem(), MenubarLabel(), MenubarRadioItem(), MenubarSeparator(), MenubarShortcut() (+3 more)

### Community 15 - "Community 15"
Cohesion: 0.14
Nodes (7): useIsMobile(), downloadResume(), ActivityBarProps, ActivitySection, CommandPalette, PROJECT_TAGLINES, StandardView()

### Community 16 - "Community 16"
Cohesion: 0.12
Nodes (9): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubContent() (+1 more)

### Community 17 - "Community 17"
Cohesion: 0.08
Nodes (14): Badge(), badgeVariants, Checkbox(), InputOTP(), InputOTPGroup(), InputOTPSlot(), NativeSelect(), NativeSelectOptGroup() (+6 more)

### Community 18 - "Community 18"
Cohesion: 0.06
Nodes (33): AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader(), AlertDialogMedia(), AlertDialogOverlay() (+25 more)

### Community 19 - "Community 19"
Cohesion: 0.18
Nodes (8): Board, emptyBoard(), initState(), Piece, PIECES, rndPiece(), SCORE_TABLE, TetrisGame()

### Community 20 - "Community 20"
Cohesion: 0.21
Nodes (10): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea() (+2 more)

### Community 21 - "Community 21"
Cohesion: 0.12
Nodes (17): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Field(), FieldContent(), FieldDescription(), FieldError() (+9 more)

### Community 22 - "Community 22"
Cohesion: 0.22
Nodes (15): ARCADE_GAME_LABELS, ARCADE_GAMES, ArcadeGameId, getAllHighScores(), getHighScore(), readAll(), resetHighScores(), ScoreMap (+7 more)

### Community 23 - "Community 23"
Cohesion: 0.18
Nodes (10): ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), INITIAL_DIMENSION, THEMES (+2 more)

### Community 24 - "Community 24"
Cohesion: 0.19
Nodes (8): useHighScore(), Bullet, COLORS, Enemy, GalagaGame(), initState(), POINTS, spawnWave()

### Community 25 - "Community 25"
Cohesion: 0.23
Nodes (10): FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItem(), FormItemContext, FormItemContextValue, FormLabel() (+2 more)

### Community 26 - "Community 26"
Cohesion: 0.22
Nodes (8): ALL_FILES, fileContents, FileType, CommandPaletteProps, ExplorerItem(), fileIcon(), Match, SearchPanel()

### Community 27 - "Community 27"
Cohesion: 0.33
Nodes (8): useArcadeSwipe(), Dir, DIR_FROM_TOUCH, initState(), newApple(), Point, rng(), SnakeGame()

### Community 28 - "Community 28"
Cohesion: 0.33
Nodes (4): Menu, Menubar(), MenubarProps, MenuItem

### Community 29 - "Community 29"
Cohesion: 0.18
Nodes (6): DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 30 - "Community 30"
Cohesion: 0.06
Nodes (34): 10. Success measures, 1. What already works, 2. Who visits, and what they need in the first 10 seconds, 3. Recruiter issues, 4. Layman issues, 5. UI/UX and accessibility issues, 6. Recommended feature: **Recruiter Quick View**, 7. Supporting fixes to ship with it (+26 more)

### Community 31 - "Community 31"
Cohesion: 0.40
Nodes (3): AccordionContent(), AccordionItem(), AccordionTrigger()

### Community 32 - "Community 32"
Cohesion: 0.22
Nodes (9): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger(), navigationMenuTriggerStyle (+1 more)

### Community 34 - "Community 34"
Cohesion: 0.29
Nodes (7): Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle()

### Community 35 - "Community 35"
Cohesion: 0.25
Nodes (4): PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle()

### Community 36 - "Community 36"
Cohesion: 0.38
Nodes (4): LANG_MAP, StatusBar(), useClock(), useSelectionCount()

### Community 37 - "Community 37"
Cohesion: 0.43
Nodes (5): ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 38 - "Community 38"
Cohesion: 0.29
Nodes (6): compilerOptions, baseUrl, paths, files, @/*, references

### Community 39 - "Community 39"
Cohesion: 0.15
Nodes (13): CopyState, RecruiterWindow(), RecruiterWindowProps, SKILL_GROUPS, RECRUITER_METRICS, RECRUITER_PROFILE, RECRUITER_PROJECTS, RECRUITER_SKILLS (+5 more)

### Community 41 - "Community 41"
Cohesion: 0.40
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 42 - "Community 42"
Cohesion: 0.38
Nodes (6): ArcadeButtonBar(), ArcadeButtonSpec, ArcadeDir, ArcadeDPad(), padBtn, useCoarsePointer()

### Community 43 - "Community 43"
Cohesion: 0.50
Nodes (4): Alert(), AlertDescription(), AlertTitle(), alertVariants

### Community 46 - "Community 46"
Cohesion: 0.18
Nodes (7): SelectContent(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger()

## Knowledge Gaps
- **243 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+238 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 2` to `Community 1`, `Community 3`, `Community 6`, `Community 9`, `Community 14`, `Community 16`, `Community 17`, `Community 18`, `Community 20`, `Community 21`, `Community 23`, `Community 25`, `Community 29`, `Community 31`, `Community 32`, `Community 34`, `Community 35`, `Community 37`, `Community 40`, `Community 41`, `Community 43`, `Community 46`?**
  _High betweenness centrality (0.380) - this node is a cross-community bridge._
- **Why does `useIsMobile()` connect `Community 15` to `Community 1`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Why does `useAudio()` connect `Community 3` to `Community 7`, `Community 10`, `Community 15`, `Community 19`, `Community 24`, `Community 27`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _243 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.055523085914669784 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.057971014492753624 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0859465737514518 - nodes in this community are weakly interconnected._