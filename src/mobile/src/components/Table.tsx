import { ReactNode, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Button from './Button';
import Icon from './Icon';
import Text from './Text';
import { Colors } from '@/styles/Colors';
import { eventEmitter } from '@/utilities/EventEmitter';
import { IProvider } from '@/provider/IProvider';

export type TableDataSource = {
  perPage?: number;
};

export type TableHeader = {
  name: string;
  label: string;
};

type ComponentProps<T> = {
  children?: ReactNode;
  getItemText: (data: T) => string;
  dataSource?: TableDataSource;
  provider: IProvider<T>;
  onPress: (row: T) => void;
  onAdd?: () => void;
  headers: TableHeader[];
};

type RowProps<T> = {
  data: T;
  getItemText: (data: T) => string;
  onPress: (data: T) => void;
};

const Row = <T,>({ data, getItemText, onPress }: RowProps<T>) => {
  return (
    <View className="bg-white">
      <Button
        text={getItemText(data)}
        className="p-6 border-b border-t-0 border-gray-200"
        labelClasses="text-base text-black"
        onPress={() => {
          onPress(data);
        }}
      />
    </View>
  );
};

export default function Table<T>(props: ComponentProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const { perPage = 10 } = props.dataSource || {};
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: perPage,
  });
  const [pageInfo, setPageInfo] = useState({
    total: 0,
    skip: 0,
  });

  const isLockPrev = () => {
    return pagination.page === 1;
  };

  const isLockNext = () => {
    return pageInfo.skip + pagination.per_page >= pageInfo.total;
  };

  const changePage = (action: 'prev' | 'next') => {
    const ignorePrev = action === 'prev' && pagination.page === 1;
    const ignoreNext = action === 'next' && pageInfo.skip + pagination.per_page >= pageInfo.total;
    if (ignorePrev || ignoreNext) {
      return;
    }
    setPagination((oldPagination) => {
      if (action === 'prev') {
        return { ...oldPagination, page: oldPagination.page - 1 };
      }
      return { ...oldPagination, page: oldPagination.page + 1 };
    });
  };

  useEffect(() => {
    const resource = `/${props.provider.resource}`;
    const eventList = `${resource}/list`;
    const fetch = () => {
      props.provider
        .list({ filter: pagination })
        .then((result) => {
          setData(result.data);
          setError(null);
          setPageInfo({
            skip: result.pagination.skip,
            total: result.pagination.total,
          });
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetch();
    const handleEvent = ({ action }: { action: string }) => {
      if (action == 'reload') {
        fetch();
      }
    };
    eventEmitter.on(eventList, handleEvent);
    return () => {
      eventEmitter.off(eventList, handleEvent);
    };
  }, [pagination]);
  return (
    <View className="mx-4 mt-2 bg-white">
      <View className="bg-gray-200 px-6 py-4 border-t border-b border-gray-300 flex-row">
        {props.headers.map((header) => {
          return (
            <View className="flex-1" key={header.name}>
              <Text className="text-gray-400 font-bold">{header.label}</Text>
            </View>
          );
        })}
      </View>
      <ScrollView style={{ maxHeight: '66%' }}>
        {error && <Text className="bg-red-500">{error.message}</Text>}
        {data?.map((row, index) => (
          <Row<T> key={index} data={row} getItemText={props.getItemText} onPress={props.onPress} />
        ))}
      </ScrollView>
      <View className="items-center my-4">
        <Button
          className="p-4 bg-primary"
          onPress={() => {
            if (props.onAdd) {
              props.onAdd();
            }
          }}
        >
          <Icon name="add" color={Colors.white} />
          <Text className="text-white">Adicionar</Text>
        </Button>
      </View>
      <View>
        <View className="flex-row justify-center gap-4 m-4">
          <Button
            className={`px-6 border ${isLockPrev() ? 'border-gray-300' : 'border-gray-400'} rounded-lg`}
            onPress={() => changePage('prev')}
          >
            <Icon name="keyboard-arrow-left" size={36} color={isLockPrev() ? '#d1d5db' : '#2D2D2D'} />
          </Button>
          <Text className="align-middle justify-center items-center text-center">
            {pageInfo.skip + 1} - {perPage > pageInfo.total ? pageInfo.total : perPage} de {pageInfo.total}
          </Text>
          <Button
            className={`px-6 border ${isLockPrev() ? 'border-gray-300' : 'border-gray-400'} rounded-lg`}
            onPress={() => changePage('next')}
          >
            <Icon name="keyboard-arrow-right" size={36} color={isLockNext() ? '#d1d5db' : '#2D2D2D'} />
          </Button>
        </View>
      </View>
    </View>
  );
}
