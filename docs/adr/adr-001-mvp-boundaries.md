# Where to save state
- postgres: rooms, users, membership, session facts, statistic agregators
- redis: volatile rooms state, rate limit, locks
- bullmq: delayed reminders, session autofinish, postsession summaries and aggregations

# realtime
- client -> ws -> api realtime
- api reads room state and writes to redis. Facts start end are written to postgres. Hard values are into queues
