#ifndef FILESCORE_H
#define FILESCORE_H

#include <QString>
#include <QObject>


class FileScore: public QObject
{
    Q_OBJECT

public:
    FileScore(const QString &file,QString &t, float s);
    ~FileScore();
    QString getFilename();
    QString getTitle();
    static bool greaterThan(FileScore *f1,FileScore *f2);
private:
    float score;
    QString filename;
    QString title;
};

#endif // FILESCORE_H
