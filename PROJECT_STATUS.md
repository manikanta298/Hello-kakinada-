# Hello Kakinada — Build Status

_Last updated: Sep 12, 2026_

## ✅ Completed

| Area | Files | Notes |
|---|---|---|
| **Theme** | `theme/*` | colors, typography, spacing, radius, shadows, dimensions |
| **Root layout & entry** | `app/_layout.tsx`, `app/index.tsx`, `providers/*` | wires providers + stack; entry currently sends everyone straight to Home (no hard login wall) |
| **Auth flow** | `app/(auth)/*` + `components/auth/*`, `store/authStore.ts` | login, register, OTP, forgot-password — mocked, any 4-digit OTP succeeds |
| **Tab navigation** | `app/(tabs)/_layout.tsx`, `explore.tsx`, `post.tsx`, `saved.tsx`, `profile.tsx` + `store/favoritesStore.ts` | 5-tab bar, center Post button opens wizard as modal; Saved reads `favoritesStore`; Profile shows guest state + logout |
| **Home** | `app/(tabs)/index.tsx` + `components/home/*` | search bar, category grid, popular listings rail — now loads via `services/` |
| **Listing Detail** | `app/listing/[id].tsx` + `components/listings/*`, `components/reviews/*` | gallery, address, hours, reviews, Call/Directions — now loads via `services/` |
| **Search & Filters** | `app/search/index.tsx`, `app/search/filters.tsx` + `components/search/*` | live filtering, sort, `searchStore` — search now runs through `listingService.search()` |
| **Post-Listing Wizard** | `app/post-listing/*` (6 steps) + `components/forms/*` | category → details → location → photos → preview → success, `postListingStore` |
| **Owner Dashboard** | `app/owner/*` (4 screens) + `components/owner/*` | stats, subscription, listings (edit/delete), leads, plan upgrade — now loads via `services/` |
| **Mock data** | `data/*` | categories, listings, reviews, leads, owner listings, subscription, hours |
| **Services layer** | `services/index.ts`, `services/mock/*`, `services/api/client.ts` (stub) | All 13 screens/components that used to import `data/mock*.ts` directly now go through `categoryService`, `listingService`, `reviewService`, `workingHoursService`, `ownerService`. Each method simulates network latency and returns a Promise, so screens carry real loading state (`components/common/LoadingState.tsx`). Swapping to a real backend later means implementing `services/api/*` and flipping one flag in `services/index.ts` — no screen changes needed. `services/storage/*` and `services/external/*` are still empty, not needed yet. |
| **Categories browse** | `app/categories/index.tsx`, `app/categories/[slug].tsx` | Full category list with listing counts, and a per-category listings screen reusing `SearchResultCard`/`SearchEmptyState`. Wired from `CategoryGrid` (tapping a category card) and from "See all" on the Home/Explore category section headers. Registered in the root `Stack`. |
| **Profile section** | `app/profile/{edit,my-listings,recently-viewed,notifications,settings,help}.tsx` | `edit` updates `authStore` (new `updateUser` action); `my-listings` pulls from `ownerService`+`listingService`; `recently-viewed` backed by new `store/recentlyViewedStore.ts`, recorded automatically from `listing/[id].tsx`; `notifications` backed by new `services/mock/notificationService.ts` + `data/mockNotifications.ts` + `types/notification.ts`; `settings` has notification toggles, account links, and a delete-account danger zone; `help` has an FAQ accordion + call/email contact rows. Registered in the root `Stack`; the Profile tab's avatar row now opens Edit Profile. |
| **Category-specific detail screens** | `app/{business,jobs,properties,hotels,services}/[id].tsx` | Each category now has its own detail screen instead of all routing through the generic `listing/[id].tsx`: `business` (restaurants/healthcare/education/shopping) mirrors the generic layout; `jobs` adds salary/job type/experience/skills via new `jobService`+`types/job.ts`; `properties` adds beds/baths/area/furnishing/amenities via new `propertyService`+`types/property.ts`; `hotels` adds check-in/out/amenities/room types via new `hotelService`+`types/hotel.ts`; `services` (electricians etc.) adds pricing/availability/service area via new `serviceListingService`+`types/serviceListing.ts`. Mock detail data lives in `data/mock{Job,Property,Hotel,Service}Details.ts`, keyed to existing listing ids. New `utils/listingRoute.ts` maps a listing's `categoryId` to the right route and is used by `ListingCard` and `SearchResultCard`, so Home, Search, Saved, and Categories all deep-link correctly. All five routes record recently-viewed and are registered in the root `Stack`. |
| **Hooks** | `hooks/{useAsync,useCategories,useListings,useSearch,useFavorites,useRecentlyViewed,useOwnerListings,useNotifications,useAuth,useListingDetail,useJobDetail,usePropertyDetail,useHotelDetail,useServiceDetail}.ts` | `useAsync` is the shared fetch/loading/cancellation primitive every screen was hand-rolling; the rest wrap it (or a store) per data need. Wired into every screen that had the fetch-on-mount pattern: Home, Explore, Search, Saved, `categories/[slug]`, all six listing detail screens, `owner/listings`, and `profile/{my-listings,recently-viewed,notifications,edit,settings}`. Screens are now presentation-only — no `useEffect`/`cancelled`-flag boilerplate left in them. `useLocation` wasn't added — the app has no real geolocation yet (distances are mock data), so there's nothing for it to wrap. |
| **Listing sub-pages** | `app/listing/reviews.tsx`, `app/listing/report.tsx` | `reviews.tsx` is the full paginated-in-one-screen review list (`RatingSummary` + all `ReviewCard`s) that `ReviewList`'s "See all N reviews" link already pointed at — new `useListingReviews` hook. `report.tsx` is a reason-picker + optional-details form with a success state, backed by a new `reportService.submit()` (mock, logs to console) and `useReportListing` hook. A small new `ReportLink` component ("Report this listing") is now on the bottom of all six detail screens (`listing`, `business`, `jobs`, `properties`, `hotels`, `services`) linking to `report.tsx`. Both routes registered in the root `Stack` (`report` as a modal). |

## ⏳ Pending (from original scaffold, not yet built)

| Area | Planned files | Priority |
|---|---|---|
| **Map** | `app/map/index.tsx`, `components/map/*` | Low — currently a placeholder in Search |
| **Modals** | `contact.tsx`, `directions.tsx`, `share.tsx` | Low |
| **Real API layer** | `services/api/*` implementation, `services/storage/*`, `services/external/*` | High once a real backend exists — mock services are in place as the seam to swap |
| **Global stores** | `listingStore.ts`, `appStore.ts` | Medium (`authStore`, `favoritesStore`, `searchStore`, `postListingStore`, `recentlyViewedStore` already exist) |
| **Config** | `environment.ts`, `app.config.ts` | Low for prototype |
| **Tests** | everything under `tests/` | Low for prototype, needed before production |

## Recommended next order

1. `app/map/index.tsx` + `components/map/*` — the last real user-facing gap; Search's "map" toggle currently shows an empty placeholder
2. `contact.tsx` / `directions.tsx` / `share.tsx` modals — small, and would round out the listing detail actions
3. `services/api/*` — implement against a real backend once one exists, then flip `USE_MOCKS` in `services/index.ts`
