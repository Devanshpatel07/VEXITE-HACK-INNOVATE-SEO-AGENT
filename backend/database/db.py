from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
import os

RAW_DB_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./backend.db")

# Fallback to SQLite for SQLAlchemy engine if RAW_DB_URL is MongoDB
if RAW_DB_URL.startswith("mongodb"):
    DATABASE_URL = "sqlite+aiosqlite:///./backend.db"
else:
    DATABASE_URL = RAW_DB_URL

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
