* Включить модуль ```Generate ABIS API```
* Включить модуль CORS


Добавить в SITENAME/admin/config/services/cors

для проды

```api/generate-abis/*|https://xml.journals.sgu.ru|GET, OPTIONS|Content-Type, Authorization, X-CSRF-Token|true```

Для локалки

```api/generate-abis/*|http://localhost:5173|GET|Content-Type,Authorization,X-CSRF-Token|true```

