# last-asylum-alliance-manager

Remedium — дашборд альянса **[Meow] Akatsukii**. Фронт (`app/`) — React SPA; бэкенд (`server/`) — Fastify + tRPC + SQLite. Домен и принятые решения см. в [CONTEXT.md](./CONTEXT.md) и [docs/adr/](./docs/adr/).

## Разработка

```bash
cd server && npm install && npm run db:migrate && npm run dev   # порт 3000
cd app && npm install && npm run dev                             # порт 5173, проксирует /trpc и /api на 3000
```

## Первый запуск (bootstrap)

Регистрация возможна только на уже существующий ник в ростере (см. CONTEXT.md «Регистрация»), а добавлять игроков в ростер может только редактор — на пустой базе выйти из этого замкнутого круга можно только вручную, один раз:

```bash
# внутри server/ (или docker exec <контейнер> node dist/scripts/seedPlayer.js ...)
npm run seed:player -- --nick Atobar --level 25 --group R3 --playstyle Фарм --power 0
```

Затем зарегистрируйтесь под этим ником — если он совпадает с `BOOTSTRAP_ADMIN_NICK`, аккаунт сразу получит право редактирования.

## Деплой (Beget VPS + Docker)

```bash
BOOTSTRAP_ADMIN_NICK=Atobar docker compose up -d --build
```

Данные (SQLite-файл) живут в именованном volume `remedium-data`, миграции применяются автоматически при старте контейнера.

## Заливка справочных данных (CSV)

Гонка за элексиром, формация, статистика дуэлей и вклад — не редактируются через UI, а заливаются офицером через авторизованный HTTP-эндпоинт:

```bash
curl -b cookies.txt -F "file=@contribution.csv" http://<host>/api/import/contribution
```

Ресурсы: `elixir-race`, `formation`, `contribution`, `player-stats`, `weekly-rating` (для последнего дополнительно передаётся поле формы `weekStart`, например `-F weekStart=2026-09-13`). Требуется право редактирования.
