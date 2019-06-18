#include "filescore.h"

FileScore::FileScore(const QString &file, QString &t, float s)
{
    filename=file;
    title=t;
    score=s;
}

FileScore::~FileScore()
{
}

QString FileScore::getFilename()
{
    return filename;
}

QString FileScore::getTitle()
{
    return title;
}

bool FileScore::greaterThan(FileScore *f1,FileScore *f2)
{
    return f1->score>f2->score;
}
