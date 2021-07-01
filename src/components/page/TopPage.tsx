import React, { FC, useState, useEffect } from 'react';
import { Label } from '../atom/Label';
import { findAggregations, Agg, AggResult } from '../../lib/api';

export const TopPage: FC = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [url, setUrl] = useState("");
    const [token, setToken] = useState<number | null>(null);

    const [agg, setAgg] = useState<Agg | undefined>();
    const handleAggregate = async () => {
        const agg = await findAggregations(name, address, url)
        console.log(agg)
        setAgg(agg)
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/AbortController
    useEffect(() => {
        if (token) {
            clearTimeout(token);
        }
        const newToken = setTimeout(() => {
            handleAggregate();
        }, 500);
        setToken(newToken);
    }, [name, address, url]);

    const handleChangeName = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleChangeAddress = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    }

    const handleChangeUrl = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    }
    
    return (
        <>
            <h1>企業名寄せ</h1>
            <div>
                <Label text="企業名：" />
                <input value={name} onChange={handleChangeName}></input>
            </div>
            <div>
                入力した企業名：{name}
            </div>
            <div>
                <Label text="企業住所：" />
                <input value={address} onChange={handleChangeAddress}></input>
            </div>
            <div>
                入力した企業住所：{address}
            </div>
            <div>
                <Label text="企業URL：" />
                <input value={url} onChange={handleChangeUrl}></input>
            </div>
            <div>
                入力した企業URL：{url}
            </div>
            <button onClick={handleAggregate}>名寄せする</button>
            <div>
                {agg ? <ul>{agg.results.map((result) => <ResultItem key={result.globalId} item={result} />)}</ul> : "未実行"}
            </div>
        </>
    );
}

type ResultItemProps = {
    item: AggResult
}

const ResultItem: FC<ResultItemProps> = ({ item }: ResultItemProps) => {
    return (
        <li>
            {item.globalId}<br />
            {item.details.name}<br />
            {item.details.address}<br />
            {item.details.url}<br />
        </li>
    )
}

// props = { items: [1, 2] }

// <li key="1">1</li>
// <li key="2">2</li>

// props = { items: [2, 3] }

// <li key="2">22</li>
// <li key="3">3</li>
