Diagnóstico del Esquema Supabase - ArTendency


1. Lista de tablas
# Supabase Schema Diagnostics
**Fecha de generación:** 12 de April de 2025
---
## 1. Tablas existentes
| table_name |
|------------|
| art_categories |
| art_styles |
| artwork_likes |
| artwork_materials |
| artwork_tags |
| artwork_views |
| artworks |
| cart_items |
| commissions |
| conversation_participants |
| conversations |
| fair_artworks |
| fairs |
| follow_counts |
| follows |
| galleries |
| locations |
| materials |
| messages |
| notification_preferences |
| notifications |
| orders |
| pending_artists |
| pending_artworks |
| profiles |
| review_likes |
| reviews |
| sales |
| spatial_ref_sys |
| tags |
| techniques |
---

2. Detalles de columnas por tabla


| table_name                | column_name          | data_type                   | is_nullable |
| ------------------------- | -------------------- | --------------------------- | ----------- |
| art_categories            | id                   | uuid                        | NO          |
| art_categories            | name                 | text                        | NO          |
| art_categories            | description          | text                        | YES         |
| art_categories            | slug                 | text                        | NO          |
| art_categories            | created_at           | timestamp with time zone    | YES         |
| art_styles                | id                   | uuid                        | NO          |
| art_styles                | name                 | text                        | NO          |
| art_styles                | description          | text                        | YES         |
| art_styles                | slug                 | text                        | NO          |
| art_styles                | period               | text                        | YES         |
| art_styles                | created_at           | timestamp with time zone    | YES         |
| artwork_likes             | id                   | uuid                        | NO          |
| artwork_likes             | artwork_id           | uuid                        | YES         |
| artwork_likes             | artist_id            | uuid                        | YES         |
| artwork_likes             | liker_id             | uuid                        | YES         |
| artwork_likes             | liked_at             | timestamp with time zone    | YES         |
| artwork_materials         | artwork_id           | uuid                        | NO          |
| artwork_materials         | material_id          | uuid                        | NO          |
| artwork_materials         | is_primary           | boolean                     | YES         |
| artwork_materials         | percentage           | numeric                     | YES         |
| artwork_materials         | created_at           | timestamp with time zone    | YES         |
| artwork_tags              | artwork_id           | uuid                        | NO          |
| artwork_tags              | tag_id               | uuid                        | NO          |
| artwork_tags              | created_at           | timestamp with time zone    | YES         |
| artwork_views             | id                   | uuid                        | NO          |
| artwork_views             | artwork_id           | uuid                        | YES         |
| artwork_views             | artist_id            | uuid                        | YES         |
| artwork_views             | viewer_id            | uuid                        | YES         |
| artwork_views             | viewed_at            | timestamp with time zone    | YES         |
| artworks                  | id                   | uuid                        | NO          |
| artworks                  | title                | text                        | NO          |
| artworks                  | description          | text                        | YES         |
| artworks                  | price                | numeric                     | NO          |
| artworks                  | technique            | text                        | YES         |
| artworks                  | dimensions           | text                        | YES         |
| artworks                  | year                 | integer                     | YES         |
| artworks                  | image_url            | text                        | YES         |
| artworks                  | category             | text                        | YES         |
| artworks                  | style                | text                        | YES         |
| artworks                  | is_sold              | boolean                     | YES         |
| artworks                  | created_at           | timestamp with time zone    | YES         |
| artworks                  | updated_at           | timestamp with time zone    | YES         |
| artworks                  | artist_id            | uuid                        | NO          |
| artworks                  | status               | text                        | YES         |
| artworks                  | views                | integer                     | YES         |
| artworks                  | likes                | integer                     | YES         |
| cart_items                | id                   | uuid                        | NO          |
| cart_items                | user_id              | uuid                        | NO          |
| cart_items                | artwork_id           | uuid                        | NO          |
| cart_items                | quantity             | integer                     | YES         |
| cart_items                | created_at           | timestamp with time zone    | YES         |
| commissions               | id                   | uuid                        | NO          |
| commissions               | user_id              | uuid                        | NO          |
| commissions               | custom_rate          | numeric                     | NO          |
| commissions               | created_at           | timestamp with time zone    | YES         |
| commissions               | updated_at           | timestamp with time zone    | YES         |
| conversation_participants | conversation_id      | uuid                        | NO          |
| conversation_participants | user_id              | uuid                        | NO          |
| conversation_participants | role                 | text                        | YES         |
| conversation_participants | is_muted             | boolean                     | YES         |
| conversation_participants | last_read_at         | timestamp with time zone    | YES         |
| conversation_participants | created_at           | timestamp with time zone    | YES         |
| conversations             | id                   | uuid                        | NO          |
| conversations             | subject              | text                        | YES         |
| conversations             | artwork_id           | uuid                        | YES         |
| conversations             | created_at           | timestamp with time zone    | YES         |
| conversations             | updated_at           | timestamp with time zone    | YES         |
| conversations             | last_message_at      | timestamp with time zone    | YES         |
| conversations             | is_archived          | boolean                     | YES         |
| conversations_view        | id                   | uuid                        | YES         |
| conversations_view        | sender_id            | uuid                        | YES         |
| conversations_view        | receiver_id          | uuid                        | YES         |
| conversations_view        | last_message         | text                        | YES         |
| conversations_view        | last_message_at      | timestamp with time zone    | YES         |
| conversations_view        | unread_count         | integer                     | YES         |
| conversations_view        | sender_first_name    | text                        | YES         |
| conversations_view        | sender_last_name     | text                        | YES         |
| conversations_view        | sender_avatar_url    | text                        | YES         |
| conversations_view        | receiver_first_name  | text                        | YES         |
| conversations_view        | receiver_last_name   | text                        | YES         |
| conversations_view        | receiver_avatar_url  | text                        | YES         |
| fair_artworks             | id                   | uuid                        | NO          |
| fair_artworks             | fair_id              | uuid                        | NO          |
| fair_artworks             | artwork_id           | uuid                        | NO          |
| fairs                     | id                   | uuid                        | NO          |
| fairs                     | name                 | text                        | NO          |
| fairs                     | location             | text                        | YES         |
| fairs                     | start_date           | timestamp with time zone    | YES         |
| fairs                     | end_date             | timestamp with time zone    | YES         |
| fairs                     | created_at           | timestamp with time zone    | YES         |
| fairs                     | updated_at           | timestamp with time zone    | YES         |
| follow_counts             | profile_id           | uuid                        | NO          |
| follow_counts             | followers_count      | integer                     | YES         |
| follow_counts             | following_count      | integer                     | YES         |
| follow_counts             | last_updated         | timestamp with time zone    | YES         |
| follows                   | follower_id          | uuid                        | NO          |
| follows                   | followed_id          | uuid                        | NO          |
| follows                   | created_at           | timestamp with time zone    | YES         |
| galleries                 | id                   | uuid                        | NO          |
| galleries                 | created_at           | timestamp with time zone    | YES         |
| galleries                 | first_name           | text                        | YES         |
| galleries                 | last_name            | text                        | YES         |
| galleries                 | email                | text                        | YES         |
| galleries                 | avatar_url           | text                        | YES         |
| galleries                 | username             | text                        | YES         |
| galleries                 | telephone            | text                        | YES         |
| galleries                 | location             | text                        | YES         |
| galleries                 | bio                  | text                        | YES         |
| galleries                 | specialization       | text                        | YES         |
| galleries                 | founded              | text                        | YES         |
| galleries                 | artists_count        | integer                     | YES         |
| galleries                 | featured_image       | text                        | YES         |
| geography_columns         | f_table_catalog      | name                        | YES         |
| geography_columns         | f_table_schema       | name                        | YES         |
| geography_columns         | f_table_name         | name                        | YES         |
| geography_columns         | f_geography_column   | name                        | YES         |
| geography_columns         | coord_dimension      | integer                     | YES         |
| geography_columns         | srid                 | integer                     | YES         |
| geography_columns         | type                 | text                        | YES         |
| geometry_columns          | f_table_catalog      | character varying           | YES         |
| geometry_columns          | f_table_schema       | name                        | YES         |
| geometry_columns          | f_table_name         | name                        | YES         |
| geometry_columns          | f_geometry_column    | name                        | YES         |
| geometry_columns          | coord_dimension      | integer                     | YES         |
| geometry_columns          | srid                 | integer                     | YES         |
| geometry_columns          | type                 | character varying           | YES         |
| locations                 | id                   | uuid                        | NO          |
| locations                 | country              | text                        | NO          |
| locations                 | state                | text                        | YES         |
| locations                 | city                 | text                        | YES         |
| locations                 | postal_code          | text                        | YES         |
| locations                 | timezone             | text                        | YES         |
| locations                 | created_at           | timestamp with time zone    | YES         |
| locations                 | updated_at           | timestamp with time zone    | YES         |
| locations                 | coordinates          | USER-DEFINED                | YES         |
| materials                 | id                   | uuid                        | NO          |
| materials                 | name                 | text                        | NO          |
| materials                 | description          | text                        | YES         |
| materials                 | slug                 | text                        | NO          |
| materials                 | created_at           | timestamp with time zone    | YES         |
| messages                  | id                   | uuid                        | NO          |
| messages                  | sender_id            | uuid                        | YES         |
| messages                  | receiver_id          | uuid                        | YES         |
| messages                  | content              | text                        | NO          |
| messages                  | read                 | boolean                     | YES         |
| messages                  | created_at           | timestamp with time zone    | YES         |
| messages                  | conversation_id      | uuid                        | YES         |
| messages                  | subject              | text                        | YES         |
| messages                  | parent_message_id    | uuid                        | YES         |
| messages                  | is_system_message    | boolean                     | YES         |
| messages                  | metadata             | jsonb                       | YES         |
| messages                  | attachments          | jsonb                       | YES         |
| messages                  | read_at              | timestamp with time zone    | YES         |
| messages                  | recipient_id         | uuid                        | YES         |
| messages                  | status               | text                        | YES         |
| notification_preferences  | user_id              | uuid                        | NO          |
| notification_preferences  | email_notifications  | boolean                     | YES         |
| notification_preferences  | push_notifications   | boolean                     | YES         |
| notification_preferences  | in_app_notifications | boolean                     | YES         |
| notification_preferences  | preferences          | jsonb                       | YES         |
| notification_preferences  | created_at           | timestamp with time zone    | YES         |
| notification_preferences  | updated_at           | timestamp with time zone    | YES         |
| notifications             | id                   | uuid                        | NO          |
| notifications             | user_id              | uuid                        | YES         |
| notifications             | title                | text                        | NO          |
| notifications             | message              | text                        | NO          |
| notifications             | type                 | text                        | YES         |
| notifications             | read                 | boolean                     | YES         |
| notifications             | created_at           | timestamp with time zone    | YES         |
| notifications             | data                 | jsonb                       | YES         |
| notifications             | read_at              | timestamp with time zone    | YES         |
| notifications             | is_read              | boolean                     | YES         |
| orders                    | id                   | uuid                        | NO          |
| orders                    | buyer_id             | uuid                        | NO          |
| orders                    | seller_id            | uuid                        | NO          |
| orders                    | artwork_id           | uuid                        | NO          |
| orders                    | status               | text                        | YES         |
| orders                    | total_amount         | numeric                     | NO          |
| orders                    | created_at           | timestamp with time zone    | YES         |
| orders                    | updated_at           | timestamp with time zone    | YES         |
| pending_artists           | id                   | uuid                        | NO          |
| pending_artists           | first_name           | text                        | NO          |
| pending_artists           | last_name            | text                        | NO          |
| pending_artists           | email                | text                        | NO          |
| pending_artists           | telephone            | text                        | YES         |
| pending_artists           | document_url         | text                        | YES         |
| pending_artists           | created_at           | timestamp with time zone    | YES         |
| pending_artists           | role                 | text                        | YES         |
| pending_artworks          | id                   | uuid                        | NO          |
| pending_artworks          | title                | text                        | NO          |
| pending_artworks          | description          | text                        | YES         |
| pending_artworks          | price                | numeric                     | NO          |
| pending_artworks          | technique            | text                        | YES         |
| pending_artworks          | dimensions           | text                        | YES         |
| pending_artworks          | year                 | integer                     | YES         |
| pending_artworks          | image_url            | text                        | YES         |
| pending_artworks          | category             | text                        | YES         |
| pending_artworks          | style                | text                        | YES         |
| pending_artworks          | status               | text                        | YES         |
| pending_artworks          | admin_comment        | text                        | YES         |
| pending_artworks          | created_at           | timestamp with time zone    | YES         |
| pending_artworks          | updated_at           | timestamp with time zone    | YES         |
| pending_artworks          | artist_id            | uuid                        | NO          |
| profiles                  | id                   | uuid                        | NO          |
| profiles                  | first_name           | text                        | YES         |
| profiles                  | last_name            | text                        | YES         |
| profiles                  | username             | text                        | YES         |
| profiles                  | email                | text                        | YES         |
| profiles                  | avatar_url           | text                        | YES         |
| profiles                  | role                 | text                        | YES         |
| profiles                  | telephone            | text                        | YES         |
| profiles                  | created_at           | timestamp with time zone    | YES         |
| profiles                  | updated_at           | timestamp with time zone    | YES         |
| profiles                  | country              | text                        | YES         |
| profiles                  | style                | text                        | YES         |
| profiles                  | bio                  | text                        | YES         |
| profiles                  | featured_artwork     | text                        | YES         |
| profiles                  | status               | text                        | NO          |
| profiles                  | rejection_reason     | text                        | YES         |
| profiles                  | approved_at          | timestamp without time zone | YES         |
| profiles                  | rejected_at          | timestamp without time zone | YES         |
| profiles                  | portfolio_url        | text                        | YES         |
| profiles                  | artistic_statement   | text                        | YES         |
| profiles                  | bio_pdf_url          | text                        | YES         |
| profiles                  | website              | text                        | YES         |
| profiles                  | instagram            | text                        | YES         |
| profiles                  | facebook             | text                        | YES         |
| profiles                  | twitter              | text                        | YES         |
| review_likes              | review_id            | uuid                        | NO          |
| review_likes              | user_id              | uuid                        | NO          |
| review_likes              | created_at           | timestamp with time zone    | YES         |
| reviews                   | id                   | uuid                        | NO          |
| reviews                   | artwork_id           | uuid                        | YES         |
| reviews                   | reviewer_id          | uuid                        | YES         |
| reviews                   | rating               | integer                     | YES         |
| reviews                   | title                | text                        | YES         |
| reviews                   | comment              | text                        | YES         |
| reviews                   | is_verified_purchase | boolean                     | YES         |
| reviews                   | is_public            | boolean                     | YES         |
| reviews                   | likes_count          | integer                     | YES         |
| reviews                   | created_at           | timestamp with time zone    | YES         |
| reviews                   | updated_at           | timestamp with time zone    | YES         |
| sales                     | id                   | uuid                        | NO          |
| sales                     | artwork_id           | uuid                        | YES         |
| sales                     | buyer_id             | uuid                        | YES         |
| sales                     | price                | numeric                     | YES         |
| sales                     | created_at           | timestamp with time zone    | YES         |
| sales                     | artist_id            | uuid                        | YES         |
| spatial_ref_sys           | srid                 | integer                     | NO          |
| spatial_ref_sys           | auth_name            | character varying           | YES         |
| spatial_ref_sys           | auth_srid            | integer                     | YES         |
| spatial_ref_sys           | srtext               | character varying           | YES         |
| spatial_ref_sys           | proj4text            | character varying           | YES         |
| tags                      | id                   | uuid                        | NO          |
| tags                      | name                 | text                        | NO          |
| tags                      | slug                 | text                        | NO          |
| tags                      | description          | text                        | YES         |
| tags                      | type                 | text                        | YES         |
| tags                      | created_at           | timestamp with time zone    | YES         |
| tags                      | usage_count          | integer                     | YES         |
| techniques                | id                   | uuid                        | NO          |
| techniques                | name                 | text                        | NO          |
| techniques                | description          | text                        | YES         |
| techniques                | slug                 | text                        | NO          |
| techniques                | created_at           | timestamp with time zone    | YES         |


3. Políticas RSL


| tablename                 | policyname                                                   | roles           | permissive | qual                                                                                                                                                                                 | with_check                                                                                                                                                         |
| ------------------------- | ------------------------------------------------------------ | --------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| art_categories            | Cualquiera puede ver categorías                              | {public}        | PERMISSIVE | true                                                                                                                                                                                 | null                                                                                                                                                               |
| art_categories            | Solo admins pueden gestionar categorías                      | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text))))                                                                       | null                                                                                                                                                               |
| art_styles                | Cualquiera puede ver estilos                                 | {public}        | PERMISSIVE | true                                                                                                                                                                                 | null                                                                                                                                                               |
| art_styles                | Solo admins pueden gestionar estilos                         | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text))))                                                                       | null                                                                                                                                                               |
| artwork_likes             | Autenticados pueden ver likes                                | {public}        | PERMISSIVE | (auth.role() = 'authenticated'::text)                                                                                                                                                | null                                                                                                                                                               |
| artwork_materials         | Artistas pueden actualizar materiales de sus obras           | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM artworks
  WHERE ((artworks.id = artwork_materials.artwork_id) AND (artworks.artist_id = auth.uid()))))                                                   | null                                                                                                                                                               |
| artwork_materials         | Artistas pueden agregar materiales a sus obras               | {public}        | PERMISSIVE | null                                                                                                                                                                                 | (EXISTS ( SELECT 1
   FROM artworks
  WHERE ((artworks.id = artwork_materials.artwork_id) AND (artworks.artist_id = auth.uid()))))                                 |
| artwork_materials         | Artistas pueden eliminar materiales de sus obras             | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM artworks
  WHERE ((artworks.id = artwork_materials.artwork_id) AND (artworks.artist_id = auth.uid()))))                                                   | null                                                                                                                                                               |
| artwork_materials         | Cualquiera puede ver materiales de obras                     | {public}        | PERMISSIVE | true                                                                                                                                                                                 | null                                                                                                                                                               |
| artwork_tags              | Artistas pueden vincular tags a sus obras                    | {public}        | PERMISSIVE | null                                                                                                                                                                                 | (EXISTS ( SELECT 1
   FROM artworks
  WHERE ((artworks.id = artwork_tags.artwork_id) AND (artworks.artist_id = auth.uid()))))                                      |
| artwork_tags              | Cualquiera puede ver artwork_tags                            | {public}        | PERMISSIVE | true                                                                                                                                                                                 | null                                                                                                                                                               |
| artwork_views             | Titular o admin puede ver views                              | {public}        | PERMISSIVE | ((auth.uid() = artist_id) OR (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))))                                         | null                                                                                                                                                               |
| artworks                  | Admins can manage all artworks                               | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text))))                                                                       | null                                                                                                                                                               |
| artworks                  | Artists can delete their own artworks                        | {public}        | PERMISSIVE | (auth.uid() = artist_id)                                                                                                                                                             | null                                                                                                                                                               |
| artworks                  | Artists can insert their own artworks                        | {public}        | PERMISSIVE | null                                                                                                                                                                                 | (auth.uid() = artist_id)                                                                                                                                           |
| artworks                  | Artists can view their artworks                              | {public}        | PERMISSIVE | (artist_id = auth.uid())                                                                                                                                                             | null                                                                                                                                                               |
| artworks                  | Public can view artworks                                     | {authenticated} | PERMISSIVE | true                                                                                                                                                                                 | null                                                                                                                                                               |
| buckets                   | Public can read artworks bucket                              | {public}        | PERMISSIVE | (id = 'artworks'::text)                                                                                                                                                              | null                                                                                                                                                               |
| cart_items                | Users can manage their own cart                              | {public}        | PERMISSIVE | (auth.uid() = user_id)                                                                                                                                                               | null                                                                                                                                                               |
| cart_items                | Users can view their own cart                                | {public}        | PERMISSIVE | (auth.uid() = user_id)                                                                                                                                                               | null                                                                                                                                                               |
| commissions               | Admins can manage all commissions                            | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text))))                                                                       | null                                                                                                                                                               |
| commissions               | Admins can view all commissions                              | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text))))                                                                       | null                                                                                                                                                               |
| commissions               | Users can view their own commission                          | {public}        | PERMISSIVE | (auth.uid() = user_id)                                                                                                                                                               | null                                                                                                                                                               |
| conversation_participants | Usuarios pueden añadir participantes a sus conversaciones    | {public}        | PERMISSIVE | null                                                                                                                                                                                 | (EXISTS ( SELECT 1
   FROM conversation_participants cp
  WHERE ((cp.conversation_id = conversation_participants.conversation_id) AND (cp.user_id = auth.uid())))) |
| conversation_participants | Usuarios pueden ver participantes de sus conversaciones      | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM conversation_participants cp
  WHERE ((cp.conversation_id = conversation_participants.conversation_id) AND (cp.user_id = auth.uid()))))                   | null                                                                                                                                                               |
| conversations             | Usuarios pueden crear conversaciones                         | {public}        | PERMISSIVE | null                                                                                                                                                                                 | true                                                                                                                                                               |
| conversations             | Usuarios pueden ver conversaciones en las que participan     | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM conversation_participants
  WHERE ((conversation_participants.conversation_id = conversations.id) AND (conversation_participants.user_id = auth.uid())))) | null                                                                                                                                                               |
| fair_artworks             | Admins and galleries can manage fair artworks                | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND ((profiles.role = 'admin'::text) OR (profiles.role = 'gallery'::text)))))                                | null                                                                                                                                                               |
| fair_artworks             | Anyone can view fair artworks                                | {public}        | PERMISSIVE | true                                                                                                                                                                                 | null                                                                                                                                                               |
| fairs                     | Admins and galleries can manage fairs                        | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND ((profiles.role = 'admin'::text) OR (profiles.role = 'gallery'::text)))))                                | null                                                                                                                                                               |
| fairs                     | Anyone can view fairs                                        | {public}        | PERMISSIVE | true                                                                                                                                                                                 | null                                                                                                                                                               |
| follow_counts             | Cualquiera puede ver contadores de seguidores                | {public}        | PERMISSIVE | true                                                                                                                                                                                 | null                                                                                                                                                               |
| follows                   | Allow delete for unfollow                                    | {public}        | PERMISSIVE | (auth.role() = 'authenticated'::text)                                                                                                                                                | null                                                                                                                                                               |
| follows                   | Allow insert for following                                   | {public}        | PERMISSIVE | null                                                                                                                                                                                 | (auth.role() = 'authenticated'::text)                                                                                                                              |
| follows                   | Allow read for authenticated users                           | {public}        | PERMISSIVE | (auth.role() = 'authenticated'::text)                                                                                                                                                | null                                                                                                                                                               |
| follows                   | Cualquiera puede ver relaciones de seguimiento               | {public}        | PERMISSIVE | true                                                                                                                                                                                 | null                                                                                                                                                               |
| follows                   | Usuarios pueden dejar de seguir                              | {public}        | PERMISSIVE | (auth.uid() = follower_id)                                                                                                                                                           | null                                                                                                                                                               |
| follows                   | Usuarios pueden seguir a otros                               | {public}        | PERMISSIVE | null                                                                                                                                                                                 | (auth.uid() = follower_id)                                                                                                                                         |
| galleries                 | Authenticated can read galleries                             | {authenticated} | PERMISSIVE | true                                                                                                                                                                                 | null                                                                                                                                                               |
| galleries                 | Gallery can insert own profile                               | {authenticated} | PERMISSIVE | null                                                                                                                                                                                 | (auth.uid() = id)                                                                                                                                                  |
| galleries                 | Gallery can update own profile                               | {authenticated} | PERMISSIVE | (auth.uid() = id)                                                                                                                                                                    | null                                                                                                                                                               |
| locations                 | Cualquiera puede ver ubicaciones                             | {public}        | PERMISSIVE | true                                                                                                                                                                                 | null                                                                                                                                                               |
| locations                 | Solo admins pueden gestionar ubicaciones                     | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text))))                                                                       | null                                                                                                                                                               |
| materials                 | Cualquiera puede ver materiales                              | {public}        | PERMISSIVE | true                                                                                                                                                                                 | null                                                                                                                                                               |
| materials                 | Solo admins pueden gestionar materiales                      | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text))))                                                                       | null                                                                                                                                                               |
| messages                  | Allow authenticated read access                              | {public}        | PERMISSIVE | ((auth.uid() = sender_id) OR (auth.uid() = recipient_id))                                                                                                                            | null                                                                                                                                                               |
| messages                  | Receivers can update read status                             | {public}        | PERMISSIVE | (auth.uid() = receiver_id)                                                                                                                                                           | null                                                                                                                                                               |
| messages                  | Users can insert messages to themselves                      | {public}        | PERMISSIVE | null                                                                                                                                                                                 | (recipient_id = auth.uid())                                                                                                                                        |
| messages                  | Users can read their messages                                | {public}        | PERMISSIVE | ((auth.uid() = sender_id) OR (auth.uid() = receiver_id))                                                                                                                             | null                                                                                                                                                               |
| messages                  | Users can send messages                                      | {public}        | PERMISSIVE | null                                                                                                                                                                                 | (auth.uid() = sender_id)                                                                                                                                           |
| messages                  | Users can update their own sent messages                     | {public}        | PERMISSIVE | ((auth.uid() = sender_id) OR (auth.uid() = receiver_id))                                                                                                                             | null                                                                                                                                                               |
| messages                  | Users can view their own messages                            | {public}        | PERMISSIVE | ((auth.uid() = sender_id) OR (auth.uid() = receiver_id))                                                                                                                             | null                                                                                                                                                               |
| notification_preferences  | Users can create their own preferences                       | {public}        | PERMISSIVE | null                                                                                                                                                                                 | (auth.uid() = user_id)                                                                                                                                             |
| notification_preferences  | Users can update their own preferences                       | {public}        | PERMISSIVE | (auth.uid() = user_id)                                                                                                                                                               | null                                                                                                                                                               |
| notification_preferences  | Users can view their own preferences                         | {public}        | PERMISSIVE | (auth.uid() = user_id)                                                                                                                                                               | null                                                                                                                                                               |
| notification_preferences  | Usuarios pueden actualizar sus preferencias                  | {public}        | PERMISSIVE | (auth.uid() = user_id)                                                                                                                                                               | null                                                                                                                                                               |
| notification_preferences  | Usuarios pueden ver sus propias preferencias                 | {public}        | PERMISSIVE | (auth.uid() = user_id)                                                                                                                                                               | null                                                                                                                                                               |
| notifications             | Admins can manage all notifications                          | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text))))                                                                       | null                                                                                                                                                               |
| notifications             | System can create notifications                              | {public}        | PERMISSIVE | null                                                                                                                                                                                 | true                                                                                                                                                               |
| notifications             | Users can update their own notifications                     | {public}        | PERMISSIVE | (auth.uid() = user_id)                                                                                                                                                               | null                                                                                                                                                               |
| notifications             | Users can view their own notifications                       | {public}        | PERMISSIVE | ((auth.uid() = user_id) OR (user_id IS NULL))                                                                                                                                        | null                                                                                                                                                               |
| objects                   | Acceso público para visualización                            | {public}        | PERMISSIVE | (bucket_id = 'bios'::text)                                                                                                                                                           | null                                                                                                                                                               |
| objects                   | Allow users to upload documents                              | {public}        | PERMISSIVE | null                                                                                                                                                                                 | (bucket_id = 'user-documents'::text)                                                                                                                               |
| objects                   | Allow users to view documents                                | {public}        | PERMISSIVE | (bucket_id = 'user-documents'::text)                                                                                                                                                 | null                                                                                                                                                               |
| objects                   | Anyone can upload an avatar                                  | {public}        | PERMISSIVE | null                                                                                                                                                                                 | (bucket_id = 'avatars'::text)                                                                                                                                      |
| objects                   | Anyone can view bio PDFs                                     | {public}        | PERMISSIVE | (bucket_id = 'bios'::text)                                                                                                                                                           | null                                                                                                                                                               |
| objects                   | Artist avatars are publicly accessible                       | {public}        | PERMISSIVE | (bucket_id = 'artist-avatars'::text)                                                                                                                                                 | null                                                                                                                                                               |
| objects                   | Artists can delete their artwork images                      | {public}        | PERMISSIVE | ((bucket_id = 'artwork-images'::text) AND (auth.role() = 'authenticated'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))                                            | null                                                                                                                                                               |
| objects                   | Artists can delete their avatars                             | {public}        | PERMISSIVE | ((bucket_id = 'artist-avatars'::text) AND (auth.role() = 'authenticated'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))                                            | null                                                                                                                                                               |
| objects                   | Artists can delete their own artworks                        | {public}        | PERMISSIVE | ((bucket_id = 'artworks'::text) AND (auth.uid() = owner) AND (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'artist'::text)))))        | null                                                                                                                                                               |
| objects                   | Artists can update their artwork images                      | {public}        | PERMISSIVE | ((bucket_id = 'artwork-images'::text) AND (auth.role() = 'authenticated'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))                                            | null                                                                                                                                                               |
| objects                   | Artists can update their avatars                             | {public}        | PERMISSIVE | ((bucket_id = 'artist-avatars'::text) AND (auth.role() = 'authenticated'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))                                            | null                                                                                                                                                               |
| objects                   | Artists can update their own artworks                        | {public}        | PERMISSIVE | ((bucket_id = 'artworks'::text) AND (auth.uid() = owner) AND (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'artist'::text)))))        | null                                                                                                                                                               |
| objects                   | Artists can upload artwork images                            | {public}        | PERMISSIVE | null                                                                                                                                                                                 | ((bucket_id = 'artwork-images'::text) AND (auth.role() = 'authenticated'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))                          |
| objects                   | Artists can upload artworks                                  | {public}        | PERMISSIVE | null                                                                                                                                                                                 | ((bucket_id = 'artworks'::text) AND (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'artist'::text)))))               |
| objects                   | Artists can upload their avatars                             | {public}        | PERMISSIVE | null                                                                                                                                                                                 | ((bucket_id = 'artist-avatars'::text) AND (auth.role() = 'authenticated'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))                          |
| objects                   | Artwork images are publicly accessible                       | {public}        | PERMISSIVE | (bucket_id = 'artwork-images'::text)                                                                                                                                                 | null                                                                                                                                                               |
| objects                   | Authenticated can upload                                     | {public}        | PERMISSIVE | null                                                                                                                                                                                 | (auth.role() = 'authenticated'::text)                                                                                                                              |
| objects                   | Authenticated can upload to artworks                         | {authenticated} | PERMISSIVE | null                                                                                                                                                                                 | (bucket_id = 'artworks'::text)                                                                                                                                     |
| objects                   | Avatar images are publicly accessible                        | {public}        | PERMISSIVE | (bucket_id = 'avatars'::text)                                                                                                                                                        | null                                                                                                                                                               |
| objects                   | Gallery images are publicly accessible                       | {public}        | PERMISSIVE | (bucket_id = 'gallery-images'::text)                                                                                                                                                 | null                                                                                                                                                               |
| objects                   | Gallery owners can delete their gallery images               | {public}        | PERMISSIVE | ((bucket_id = 'gallery-images'::text) AND (auth.role() = 'authenticated'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))                                            | null                                                                                                                                                               |
| objects                   | Gallery owners can update their gallery images               | {public}        | PERMISSIVE | ((bucket_id = 'gallery-images'::text) AND (auth.role() = 'authenticated'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))                                            | null                                                                                                                                                               |
| objects                   | Gallery owners can upload gallery images                     | {public}        | PERMISSIVE | null                                                                                                                                                                                 | ((bucket_id = 'gallery-images'::text) AND (auth.role() = 'authenticated'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))                          |
| objects                   | Public can read artworks                                     | {public}        | PERMISSIVE | (bucket_id = 'artworks'::text)                                                                                                                                                       | null                                                                                                                                                               |
| objects                   | Public can read clips                                        | {public}        | PERMISSIVE | (bucket_id = 'clips'::text)                                                                                                                                                          | null                                                                                                                                                               |
| objects                   | Public can read profiles                                     | {public}        | PERMISSIVE | (bucket_id = 'profiles'::text)                                                                                                                                                       | null                                                                                                                                                               |
| objects                   | Users can delete their own avatar                            | {public}        | PERMISSIVE | ((bucket_id = 'avatars'::text) AND (auth.uid() = owner))                                                                                                                             | null                                                                                                                                                               |
| objects                   | Users can delete their own bio PDFs                          | {authenticated} | PERMISSIVE | ((bucket_id = 'bios'::text) AND ((auth.uid())::text = (storage.foldername(name))[1]))                                                                                                | null                                                                                                                                                               |
| objects                   | Users can update their own avatar                            | {public}        | PERMISSIVE | ((bucket_id = 'avatars'::text) AND (auth.uid() = owner))                                                                                                                             | null                                                                                                                                                               |
| objects                   | Users can update their own bio PDFs                          | {authenticated} | PERMISSIVE | ((bucket_id = 'bios'::text) AND ((auth.uid())::text = (storage.foldername(name))[1]))                                                                                                | null                                                                                                                                                               |
| objects                   | Users can upload their own bio PDFs                          | {authenticated} | PERMISSIVE | null                                                                                                                                                                                 | ((bucket_id = 'bios'::text) AND ((auth.uid())::text = (storage.foldername(name))[1]))                                                                              |
| objects                   | Usuarios autenticados pueden actualizar sus propios archivos | {authenticated} | PERMISSIVE | ((bucket_id = 'bios'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))                                                                                                | null                                                                                                                                                               |
| objects                   | Usuarios autenticados pueden eliminar sus propios archivos   | {authenticated} | PERMISSIVE | ((bucket_id = 'bios'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))                                                                                                | null                                                                                                                                                               |
| objects                   | Usuarios autenticados pueden subir archivos                  | {authenticated} | PERMISSIVE | null                                                                                                                                                                                 | (bucket_id = 'bios'::text)                                                                                                                                         |
| orders                    | Admins can manage all orders                                 | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text))))                                                                       | null                                                                                                                                                               |
| orders                    | Admins can view all orders                                   | {public}        | PERMISSIVE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text))))                                                                       | null                                                                                                                                                               |
| orders                    | Buyers can insert orders                                     | {public}        | PERMISSIVE | null                                                                                                                                                                                 | (auth.uid() = buyer_id)                                                                                                                                            |
| orders                    | Users can update orders they're involved in                  | {public}        | PERMISSIVE | ((auth.uid() = buyer_id) OR (auth.uid() = seller_id))                                                                                                                                | null                                                                                                                                                               |
| orders                    | Users can view orders they're involved in                    | {public}        | PERMISSIVE | ((auth.uid() = buyer_id) OR (auth.uid() = seller_id))                                                                                                                                | null                                                                                                                                                               |


4. Claves primarias y foráneas por tabla


| constraint_type | table_name                | column_name       | foreign_table             | foreign_column  |
| --------------- | ------------------------- | ----------------- | ------------------------- | --------------- |
| PRIMARY KEY     | art_categories            | id                | art_categories            | id              |
| PRIMARY KEY     | art_styles                | id                | art_styles                | id              |
| FOREIGN KEY     | artwork_likes             | artist_id         | profiles                  | id              |
| FOREIGN KEY     | artwork_likes             | artwork_id        | artworks                  | id              |
| PRIMARY KEY     | artwork_likes             | id                | artwork_likes             | id              |
| FOREIGN KEY     | artwork_likes             | liker_id          | profiles                  | id              |
| PRIMARY KEY     | artwork_materials         | artwork_id        | artwork_materials         | artwork_id      |
| FOREIGN KEY     | artwork_materials         | artwork_id        | artworks                  | id              |
| PRIMARY KEY     | artwork_materials         | artwork_id        | artwork_materials         | material_id     |
| PRIMARY KEY     | artwork_materials         | material_id       | artwork_materials         | artwork_id      |
| FOREIGN KEY     | artwork_materials         | material_id       | materials                 | id              |
| PRIMARY KEY     | artwork_materials         | material_id       | artwork_materials         | material_id     |
| FOREIGN KEY     | artwork_tags              | artwork_id        | artworks                  | id              |
| PRIMARY KEY     | artwork_tags              | artwork_id        | artwork_tags              | tag_id          |
| PRIMARY KEY     | artwork_tags              | artwork_id        | artwork_tags              | artwork_id      |
| PRIMARY KEY     | artwork_tags              | tag_id            | artwork_tags              | tag_id          |
| PRIMARY KEY     | artwork_tags              | tag_id            | artwork_tags              | artwork_id      |
| FOREIGN KEY     | artwork_tags              | tag_id            | tags                      | id              |
| FOREIGN KEY     | artwork_views             | artist_id         | profiles                  | id              |
| FOREIGN KEY     | artwork_views             | artwork_id        | artworks                  | id              |
| PRIMARY KEY     | artwork_views             | id                | artwork_views             | id              |
| FOREIGN KEY     | artwork_views             | viewer_id         | profiles                  | id              |
| FOREIGN KEY     | artworks                  | artist_id         | profiles                  | id              |
| PRIMARY KEY     | artworks                  | id                | artworks                  | id              |
| PRIMARY KEY     | audit_log_entries         | id                | audit_log_entries         | id              |
| PRIMARY KEY     | buckets                   | id                | buckets                   | id              |
| FOREIGN KEY     | cart_items                | artwork_id        | artworks                  | id              |
| PRIMARY KEY     | cart_items                | id                | cart_items                | id              |
| FOREIGN KEY     | cart_items                | user_id           | profiles                  | id              |
| PRIMARY KEY     | commissions               | id                | commissions               | id              |
| FOREIGN KEY     | commissions               | user_id           | profiles                  | id              |
| PRIMARY KEY     | conversation_participants | conversation_id   | conversation_participants | user_id         |
| FOREIGN KEY     | conversation_participants | conversation_id   | conversations             | id              |
| PRIMARY KEY     | conversation_participants | conversation_id   | conversation_participants | conversation_id |
| PRIMARY KEY     | conversation_participants | user_id           | conversation_participants | conversation_id |
| PRIMARY KEY     | conversation_participants | user_id           | conversation_participants | user_id         |
| FOREIGN KEY     | conversation_participants | user_id           | profiles                  | id              |
| FOREIGN KEY     | conversations             | artwork_id        | artworks                  | id              |
| PRIMARY KEY     | conversations             | id                | conversations             | id              |
| FOREIGN KEY     | fair_artworks             | artwork_id        | artworks                  | id              |
| FOREIGN KEY     | fair_artworks             | fair_id           | fairs                     | id              |
| PRIMARY KEY     | fair_artworks             | id                | fair_artworks             | id              |
| PRIMARY KEY     | fairs                     | id                | fairs                     | id              |
| PRIMARY KEY     | flow_state                | id                | flow_state                | id              |
| FOREIGN KEY     | follow_counts             | profile_id        | profiles                  | id              |
| PRIMARY KEY     | follow_counts             | profile_id        | follow_counts             | profile_id      |
| PRIMARY KEY     | follows                   | followed_id       | follows                   | followed_id     |
| PRIMARY KEY     | follows                   | followed_id       | follows                   | follower_id     |
| FOREIGN KEY     | follows                   | followed_id       | profiles                  | id              |
| PRIMARY KEY     | follows                   | follower_id       | follows                   | follower_id     |
| FOREIGN KEY     | follows                   | follower_id       | profiles                  | id              |
| PRIMARY KEY     | follows                   | follower_id       | follows                   | followed_id     |
| PRIMARY KEY     | galleries                 | id                | galleries                 | id              |
| PRIMARY KEY     | identities                | id                | identities                | id              |
| FOREIGN KEY     | identities                | user_id           | users                     | id              |
| PRIMARY KEY     | instances                 | id                | instances                 | id              |
| PRIMARY KEY     | locations                 | id                | locations                 | id              |
| PRIMARY KEY     | materials                 | id                | materials                 | id              |
| PRIMARY KEY     | messages                  | id                | messages                  | id              |
| PRIMARY KEY     | messages                  | id                | messages                  | inserted_at     |
| PRIMARY KEY     | messages                  | id                | messages                  | id              |
| PRIMARY KEY     | messages                  | inserted_at       | messages                  | inserted_at     |
| PRIMARY KEY     | messages                  | inserted_at       | messages                  | id              |
| FOREIGN KEY     | messages                  | parent_message_id | messages                  | id              |
| FOREIGN KEY     | messages                  | receiver_id       | profiles                  | id              |
| FOREIGN KEY     | messages                  | recipient_id      | profiles                  | id              |
| FOREIGN KEY     | messages                  | sender_id         | profiles                  | id              |
| PRIMARY KEY     | mfa_amr_claims            | id                | mfa_amr_claims            | id              |
| FOREIGN KEY     | mfa_amr_claims            | session_id        | sessions                  | id              |
| FOREIGN KEY     | mfa_challenges            | factor_id         | mfa_factors               | id              |
| PRIMARY KEY     | mfa_challenges            | id                | mfa_challenges            | id              |
| PRIMARY KEY     | mfa_factors               | id                | mfa_factors               | id              |
| FOREIGN KEY     | mfa_factors               | user_id           | users                     | id              |
| PRIMARY KEY     | migrations                | id                | migrations                | id              |
| FOREIGN KEY     | notification_preferences  | user_id           | profiles                  | id              |
| PRIMARY KEY     | notification_preferences  | user_id           | notification_preferences  | user_id         |
| PRIMARY KEY     | notifications             | id                | notifications             | id              |
| FOREIGN KEY     | notifications             | user_id           | profiles                  | id              |
| FOREIGN KEY     | objects                   | bucket_id         | buckets                   | id              |
| PRIMARY KEY     | objects                   | id                | objects                   | id              |
| PRIMARY KEY     | one_time_tokens           | id                | one_time_tokens           | id              |
| FOREIGN KEY     | one_time_tokens           | user_id           | users                     | id              |
| FOREIGN KEY     | orders                    | artwork_id        | artworks                  | id              |
| FOREIGN KEY     | orders                    | buyer_id          | profiles                  | id              |
| PRIMARY KEY     | orders                    | id                | orders                    | id              |
| FOREIGN KEY     | orders                    | seller_id         | profiles                  | id              |
| PRIMARY KEY     | pending_artists           | id                | pending_artists           | id              |
| FOREIGN KEY     | pending_artworks          | artist_id         | profiles                  | id              |
| PRIMARY KEY     | pending_artworks          | id                | pending_artworks          | id              |
| PRIMARY KEY     | profiles                  | id                | profiles                  | id              |
| PRIMARY KEY     | refresh_tokens            | id                | refresh_tokens            | id              |
| FOREIGN KEY     | refresh_tokens            | session_id        | sessions                  | id              |
| PRIMARY KEY     | review_likes              | review_id         | review_likes              | user_id         |
| PRIMARY KEY     | review_likes              | review_id         | review_likes              | review_id       |
| FOREIGN KEY     | review_likes              | review_id         | reviews                   | id              |
| PRIMARY KEY     | review_likes              | user_id           | review_likes              | review_id       |
| PRIMARY KEY     | review_likes              | user_id           | review_likes              | user_id         |
| FOREIGN KEY     | review_likes              | user_id           | profiles                  | id              |
| FOREIGN KEY     | reviews                   | artwork_id        | artworks                  | id              |
| PRIMARY KEY     | reviews                   | id                | reviews                   | id              |


5. Índices existentes en cada tabla


| tablename                 | indexname                              | indexdef                                                                                                                      |
| ------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| art_categories            | art_categories_slug_key                | CREATE UNIQUE INDEX art_categories_slug_key ON public.art_categories USING btree (slug)                                       |
| art_categories            | art_categories_pkey                    | CREATE UNIQUE INDEX art_categories_pkey ON public.art_categories USING btree (id)                                             |
| art_styles                | art_styles_pkey                        | CREATE UNIQUE INDEX art_styles_pkey ON public.art_styles USING btree (id)                                                     |
| art_styles                | art_styles_slug_key                    | CREATE UNIQUE INDEX art_styles_slug_key ON public.art_styles USING btree (slug)                                               |
| artwork_likes             | artwork_likes_artwork_id_liker_id_key  | CREATE UNIQUE INDEX artwork_likes_artwork_id_liker_id_key ON public.artwork_likes USING btree (artwork_id, liker_id)          |
| artwork_likes             | idx_artwork_likes_artist_id            | CREATE INDEX idx_artwork_likes_artist_id ON public.artwork_likes USING btree (artist_id)                                      |
| artwork_likes             | artwork_likes_pkey                     | CREATE UNIQUE INDEX artwork_likes_pkey ON public.artwork_likes USING btree (id)                                               |
| artwork_materials         | artwork_materials_artwork_id_idx       | CREATE INDEX artwork_materials_artwork_id_idx ON public.artwork_materials USING btree (artwork_id)                            |
| artwork_materials         | artwork_materials_material_id_idx      | CREATE INDEX artwork_materials_material_id_idx ON public.artwork_materials USING btree (material_id)                          |
| artwork_materials         | artwork_materials_pkey                 | CREATE UNIQUE INDEX artwork_materials_pkey ON public.artwork_materials USING btree (artwork_id, material_id)                  |
| artwork_materials         | artwork_materials_is_primary_idx       | CREATE INDEX artwork_materials_is_primary_idx ON public.artwork_materials USING btree (is_primary)                            |
| artwork_tags              | artwork_tags_pkey                      | CREATE UNIQUE INDEX artwork_tags_pkey ON public.artwork_tags USING btree (artwork_id, tag_id)                                 |
| artwork_views             | artwork_views_artwork_id_viewer_id_key | CREATE UNIQUE INDEX artwork_views_artwork_id_viewer_id_key ON public.artwork_views USING btree (artwork_id, viewer_id)        |
| artwork_views             | idx_artwork_views_artist_id            | CREATE INDEX idx_artwork_views_artist_id ON public.artwork_views USING btree (artist_id)                                      |
| artwork_views             | artwork_views_pkey                     | CREATE UNIQUE INDEX artwork_views_pkey ON public.artwork_views USING btree (id)                                               |
| artworks                  | artworks_pkey                          | CREATE UNIQUE INDEX artworks_pkey ON public.artworks USING btree (id)                                                         |
| cart_items                | cart_items_pkey                        | CREATE UNIQUE INDEX cart_items_pkey ON public.cart_items USING btree (id)                                                     |
| cart_items                | cart_items_user_id_artwork_id_key      | CREATE UNIQUE INDEX cart_items_user_id_artwork_id_key ON public.cart_items USING btree (user_id, artwork_id)                  |
| commissions               | commissions_pkey                       | CREATE UNIQUE INDEX commissions_pkey ON public.commissions USING btree (id)                                                   |
| commissions               | commissions_user_id_key                | CREATE UNIQUE INDEX commissions_user_id_key ON public.commissions USING btree (user_id)                                       |
| conversation_participants | conversation_participants_user_id_idx  | CREATE INDEX conversation_participants_user_id_idx ON public.conversation_participants USING btree (user_id)                  |
| conversation_participants | conversation_participants_pkey         | CREATE UNIQUE INDEX conversation_participants_pkey ON public.conversation_participants USING btree (conversation_id, user_id) |
| conversations             | conversations_artwork_id_idx           | CREATE INDEX conversations_artwork_id_idx ON public.conversations USING btree (artwork_id)                                    |
| conversations             | conversations_updated_at_idx           | CREATE INDEX conversations_updated_at_idx ON public.conversations USING btree (updated_at)                                    |
| conversations             | conversations_pkey                     | CREATE UNIQUE INDEX conversations_pkey ON public.conversations USING btree (id)                                               |
| fair_artworks             | fair_artworks_pkey                     | CREATE UNIQUE INDEX fair_artworks_pkey ON public.fair_artworks USING btree (id)                                               |
| fair_artworks             | fair_artworks_fair_id_artwork_id_key   | CREATE UNIQUE INDEX fair_artworks_fair_id_artwork_id_key ON public.fair_artworks USING btree (fair_id, artwork_id)            |
| fairs                     | fairs_pkey                             | CREATE UNIQUE INDEX fairs_pkey ON public.fairs USING btree (id)                                                               |
| follow_counts             | follow_counts_pkey                     | CREATE UNIQUE INDEX follow_counts_pkey ON public.follow_counts USING btree (profile_id)                                       |
| follows                   | follows_pkey                           | CREATE UNIQUE INDEX follows_pkey ON public.follows USING btree (follower_id, followed_id)                                     |
| follows                   | follows_created_at_idx                 | CREATE INDEX follows_created_at_idx ON public.follows USING btree (created_at)                                                |
| follows                   | follows_followed_id_idx                | CREATE INDEX follows_followed_id_idx ON public.follows USING btree (followed_id)                                              |
| follows                   | follows_follower_id_idx                | CREATE INDEX follows_follower_id_idx ON public.follows USING btree (follower_id)                                              |
| galleries                 | galleries_pkey                         | CREATE UNIQUE INDEX galleries_pkey ON public.galleries USING btree (id)                                                       |
| locations                 | locations_pkey                         | CREATE UNIQUE INDEX locations_pkey ON public.locations USING btree (id)                                                       |
| locations                 | locations_coordinates_idx              | CREATE INDEX locations_coordinates_idx ON public.locations USING gist (coordinates)                                           |
| materials                 | materials_pkey                         | CREATE UNIQUE INDEX materials_pkey ON public.materials USING btree (id)                                                       |
| materials                 | materials_slug_key                     | CREATE UNIQUE INDEX materials_slug_key ON public.materials USING btree (slug)                                                 |
| messages                  | messages_sender_id_idx                 | CREATE INDEX messages_sender_id_idx ON public.messages USING btree (sender_id)                                                |
| messages                  | messages_pkey                          | CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (id)                                                         |
| messages                  | messages_conversation_id_idx           | CREATE INDEX messages_conversation_id_idx ON public.messages USING btree (conversation_id)                                    |
| messages                  | messages_receiver_id_idx               | CREATE INDEX messages_receiver_id_idx ON public.messages USING btree (receiver_id)                                            |
| messages                  | messages_created_at_idx                | CREATE INDEX messages_created_at_idx ON public.messages USING btree (created_at)                                              |
| messages                  | idx_messages_recipient_id              | CREATE INDEX idx_messages_recipient_id ON public.messages USING btree (recipient_id)                                          |
| messages                  | idx_messages_status                    | CREATE INDEX idx_messages_status ON public.messages USING btree (status)                                                      |
| notification_preferences  | notification_preferences_pkey          | CREATE UNIQUE INDEX notification_preferences_pkey ON public.notification_preferences USING btree (user_id)                    |
| notifications             | notifications_user_id_idx              | CREATE INDEX notifications_user_id_idx ON public.notifications USING btree (user_id)                                          |
| notifications             | notifications_type_idx                 | CREATE INDEX notifications_type_idx ON public.notifications USING btree (type)                                                |
| notifications             | notifications_pkey                     | CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (id)                                               |
| notifications             | notifications_created_at_idx           | CREATE INDEX notifications_created_at_idx ON public.notifications USING btree (created_at)                                    |
| notifications             | notifications_is_read_idx              | CREATE INDEX notifications_is_read_idx ON public.notifications USING btree (is_read)                                          |
| orders                    | orders_pkey                            | CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (id)                                                             |
| pending_artists           | pending_artists_pkey                   | CREATE UNIQUE INDEX pending_artists_pkey ON public.pending_artists USING btree (id)                                           |
| pending_artists           | pending_artists_email_key              | CREATE UNIQUE INDEX pending_artists_email_key ON public.pending_artists USING btree (email)                                   |
| pending_artworks          | pending_artworks_pkey                  | CREATE UNIQUE INDEX pending_artworks_pkey ON public.pending_artworks USING btree (id)                                         |
| profiles                  | profiles_pkey                          | CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id)                                                         |
| profiles                  | profiles_username_key                  | CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username)                                           |
| review_likes              | review_likes_pkey                      | CREATE UNIQUE INDEX review_likes_pkey ON public.review_likes USING btree (review_id, user_id)                                 |
| reviews                   | reviews_created_at_idx                 | CREATE INDEX reviews_created_at_idx ON public.reviews USING btree (created_at)                                                |
| reviews                   | reviews_pkey                           | CREATE UNIQUE INDEX reviews_pkey ON public.reviews USING btree (id)                                                           |
| reviews                   | reviews_artwork_id_idx                 | CREATE INDEX reviews_artwork_id_idx ON public.reviews USING btree (artwork_id)                                                |
| reviews                   | reviews_reviewer_id_idx                | CREATE INDEX reviews_reviewer_id_idx ON public.reviews USING btree (reviewer_id)                                              |
| reviews                   | reviews_rating_idx                     | CREATE INDEX reviews_rating_idx ON public.reviews USING btree (rating)                                                        |
| reviews                   | reviews_verified_idx                   | CREATE INDEX reviews_verified_idx ON public.reviews USING btree (is_verified_purchase)                                        |
| sales                     | sales_pkey                             | CREATE UNIQUE INDEX sales_pkey ON public.sales USING btree (id)                                                               |
| spatial_ref_sys           | spatial_ref_sys_pkey                   | CREATE UNIQUE INDEX spatial_ref_sys_pkey ON public.spatial_ref_sys USING btree (srid)                                         |
| tags                      | tags_usage_count_idx                   | CREATE INDEX tags_usage_count_idx ON public.tags USING btree (usage_count DESC)                                               |
| tags                      | tags_type_idx                          | CREATE INDEX tags_type_idx ON public.tags USING btree (type)                                                                  |
| tags                      | tags_name_idx                          | CREATE INDEX tags_name_idx ON public.tags USING gin (to_tsvector('spanish'::regconfig, name))                                 |
| tags                      | tags_pkey                              | CREATE UNIQUE INDEX tags_pkey ON public.tags USING btree (id)                                                                 |
| tags                      | tags_slug_key                          | CREATE UNIQUE INDEX tags_slug_key ON public.tags USING btree (slug)                                                           |
| techniques                | techniques_pkey                        | CREATE UNIQUE INDEX techniques_pkey ON public.techniques USING btree (id)                                                     |
| techniques                | techniques_slug_key                    | CREATE UNIQUE INDEX techniques_slug_key ON public.techniques USING btree (slug)                                               |
