# Checklist
1. Re-enable CSRF in spring security

# Notes underway
1. Started learning lombok, seems like a godsend


# SQL notes:
```sql
CREATE TABLE TimelineEvents (
    EventID SERIAL PRIMARY KEY,
    EventName VARCHAR(255) NOT NULL,
    EventDescription TEXT,
    EventStart DATE NOT NULL,
    EventEnd DATE,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);
```
```sql
CREATE OR REPLACE FUNCTION update_updatedat_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updatedAt = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```
```sql
CREATE TRIGGER update_updatedat BEFORE UPDATE ON TimelineEvents
FOR EACH ROW EXECUTE FUNCTION update_updatedat_column();

```