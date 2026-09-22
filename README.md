# last-asylum-alliance-manager

Remedium — дашборд альянса **[IRON] ЦАРСТВО**. Фронт (`app/`) — React SPA; бэкенд (`server/`) — Fastify + tRPC + SQLite. Домен и принятые решения см. в [CONTEXT.md](./CONTEXT.md) и [docs/adr/](./docs/adr/), структуру БД — в [docs/database.md](./docs/database.md), формат заливки CSV — в [docs/csv-import.md](./docs/csv-import.md).

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

## Деплой

Автоматический: пуш/мёрж в `master` triggers `.github/workflows/deploy.yml` — заходит по SSH на VPS (secrets `DEPLOY_HOST`/`DEPLOY_USER`/`DEPLOY_SSH_KEY`) и в `/opt/remedium` (настоящий `git clone`, не архив) делает `git reset --hard origin/master && docker compose up -d --build`.

Вручную (первый раз на новом VPS, пользователь `deploy` в группе `docker`, не root):

```bash
git clone https://github.com/at0bar/remedium.git /opt/remedium && cd /opt/remedium
printf 'BOOTSTRAP_ADMIN_NICK=Atobar\nHOST_PORT=80\nCOOKIE_SECURE=false\n' > .env   # COOKIE_SECURE=true только за настоящим TLS
docker compose up -d --build
```

Данные (SQLite-файл) живут в именованном volume (`<имя-каталога>_remedium-data` — поэтому каталог должен называться `remedium`), миграции применяются автоматически при старте контейнера.

## Заливка справочных данных (CSV)

Гонка за элексиром, формация, статистика дуэлей и вклад — не редактируются через UI, а заливаются офицером через авторизованный HTTP-эндпоинт `POST /api/import/:resource`. Формат файлов по каждому ресурсу, поведение замены/накопления и примеры — в [docs/csv-import.md](./docs/csv-import.md).
