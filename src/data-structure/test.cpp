#include <iostream>

using namespace std;

typedef struct
{
  int *data;
  int maxSize;
  int length;
} SqList;

void initList(SqList &list, int initSize)
{
  list.data = (int *)malloc(initSize * sizeof(int));
  list.length = 0;
  list.maxSize = initSize;
}
void increaseSize(SqList &list, int addSize)
{
  int *p = list.data;
  list.data = (int *)malloc((list.maxSize + addSize) * sizeof(int));
  int i = 0;
  while (i++ < list.length)
  {
    list.data[i] = p[i];
  }
  list.maxSize = list.maxSize + addSize;
  free(p);
}

bool insert(SqList &list, int position, int ele)
{
  if (position < 1 || position >= list.length)
  {
    return false;
  }

  if (list.length >= list.maxSize)
  {
    return false;
  }

  int j = list.length;
  // 移动元素

  /**
   * 时间复杂度：关注最深的循环语句的问题规模的n的关系
   * 最好：在末尾插入，i===n+1 不需要移动元素 O(1)
   * 最坏：在开头插入，需要移动 n 个元素 O(n)
   * 平均：n 个元素有 n+1 个位置，每个位置的插入的概率 p = 1/(n+1)
   * 平均循环次数 = np + (n-1)*p + (n-2)*p + 1*p + 0*p = n(n+1)/2 * (1/n+1)= n/2 
   * O(n)
   */
  while (j-- >= position)
  {
    list.data[j] = list.data[j - 1];
  }
  list.data[position - 1] = ele;
  list.length += 1;
  return true;
}

bool deleteEle(SqList &list, int position, int &e)
{
  if (position < 1 || position >= list.length)
  {
    return false;
  }

  if (list.length >= list.maxSize)
  {
    return false;
  }
  e = list.data[position - 1];
  int j = position;
  while (j++ < list.length)
  {
    list.data[j - 1] = list.data[j];
  }

  list.length -= 1;

  return true;
}

int main()
{
  SqList list;
  initList(list, 10);
  int i = 1;
  while (i++ <= 10)
  {
    insert(list, i, i);
  }
  int e = -1;
  if (deleteEle(list, 2, e))
  {
    cout << "删除成功" << endl;
  }
  else
  {
    cout << "删除失败" << endl;
  }
  cout << endl;
  return -1;
}